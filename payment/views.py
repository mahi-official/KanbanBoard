from django.http.response import JsonResponse
from django.shortcuts import render
import braintree
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated

# Create your views here.
gateway = braintree.BraintreeGateway(
  braintree.Configuration(
    environment=braintree.Environment.Sandbox,
    merchant_id='hqjchq47t9nmbpjy',
    public_key='d3mchgqv4h6bwctr',
    private_key='68cfc413f9f82a3e1b50b732b88b4a6f'
  )
)

@csrf_exempt
@api_view(["GET"])
@permission_classes((IsAuthenticated,))
def generate_token(request):

    return JsonResponse({
        "status": status.HTTP_200_OK,
        "clientToken": gateway.client_token.generate(),
        "authToken": request.user.auth_token
    })

@csrf_exempt
@api_view(["POST"])
@permission_classes((IsAuthenticated,))
def process_payment(request):

    clientNonce = request.data.get("paymentNonce")
    clientAmount = request.data.get("amount")

    result = gateway.transaction.sale({
        "amount": clientAmount,
        "payment_method_nonce": clientNonce,
        "options": {
        "submit_for_settlement": True
        }
    })

    if result.is_success:
        transaction = result.transaction
        print(transaction)
        return JsonResponse({
            "status": status.HTTP_200_OK,
            "transaction": transaction,
        })
    
    return JsonResponse({
        "status": status.HTTP_400_BAD_REQUEST,
        "error": "Transaction Failed. Please try again."
    })
    