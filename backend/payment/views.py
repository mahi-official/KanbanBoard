from django.http.response import JsonResponse
from django.shortcuts import render
import braintree
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated

from django.conf import settings

from order.models import Order
from payment.models import Payment

# Create your views here.
gateway = braintree.BraintreeGateway(
    braintree.Configuration(
        environment=braintree.Environment.Sandbox,
        merchant_id= settings.CREDENTIALS.get("braintree_merchant_id"),
        public_key=settings.CREDENTIALS.get("braintree_public_key"),
        private_key=settings.CREDENTIALS.get("braintree_private_key"),
    )
)


@csrf_exempt
@api_view(["GET"])
@permission_classes((IsAuthenticated,))
def generate_token(request):

    return JsonResponse({
        "status": status.HTTP_200_OK,
        "client": gateway.client_token.generate(),
    })


@csrf_exempt
@api_view(["POST"])
@permission_classes((IsAuthenticated,))
def process_payment(request):

    clientNonce = request.data.get("paymentNonce")
    clientAmount = request.data.get("amount")
    if clientNonce and clientAmount:
        result = gateway.transaction.sale({
            "amount": clientAmount,
            "payment_method_nonce": clientNonce,
            "options": {
                "submit_for_settlement": True
            }
        })

        if result.is_success:
            transaction = result.transaction
            trxn = Payment(transactionID=transaction.id,
                           amount=transaction.amount)
            trxn.save()
            return JsonResponse({
                "status": status.HTTP_200_OK,
                "transaction": transaction.id,
                "amount": transaction.amount,
            })

    return JsonResponse({
        "status": status.HTTP_400_BAD_REQUEST,
        "error": "Transaction Failed. Please try again."
    })
