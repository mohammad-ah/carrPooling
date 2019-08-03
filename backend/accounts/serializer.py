from .models import User, Vehicle
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from django.dispatch import receiver
from django.db.models.signals import post_save


class UserSerializer(serializers.ModelSerializer):

	class Meta:
		model = User
		# fields = '__all__'
		fields = ('id', 'username', 'email', 'phone', 'gender', 'is_staff', 'is_superuser', 'is_active', 'password')
		extra_kwargs = {'password': {'write_only': True, 'required': True}}

		@receiver(post_save, sender=User)
		def create_auth_token(sender, instance=None, created=False, **kwargs):
			if created:
				Token.objects.create(user=instance)
				instance.set_password(instance.password)
				User.save(instance)
				return User


class UserLoginTokenSerializer(serializers. ModelSerializer):
    class Meta:
        model = Token
        fields = '__all__'


class VehicleSerializer(serializers.ModelSerializer):
	user = UserSerializer(many=False)

	class Meta:
		model = Vehicle
		fields = ('id', 'driver_name', 'type', 'car_plate', 'production_year', 'seats', 'user')




