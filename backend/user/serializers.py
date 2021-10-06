from user.models import User
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import permission_classes, authentication_classes

class UserSerializer(serializers.HyperlinkedModelSerializer):

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password:
            instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        for attr, val in validated_data.items():
            if attr == 'password':
                instance.set_password(val)
            else:
                setattr(instance, attr, val)
        instance.save()
        return instance

    class Meta:
        model = User
        extra_kwargs = {'password': {'write_only': True}}
        fields = ('userID', 'name', 'email', 'phone', 'password', 'type', 'is_active', 'is_superuser')

        