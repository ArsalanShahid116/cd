"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""

from django.conf.urls import url, include
from django.contrib import admin
from rest_framework import routers                    # add this
from cdEditor import views                            # add this

router = routers.DefaultRouter()                      # add this
router.register(r'program', views.programView, 'program')     # add this

urlpatterns = [
            url('admin/', admin.site.urls),
            url('api/', include(router.urls)),
            url('api-auth/', include('rest_framework.urls')),
            url('rest-auth/registration/', include('rest_auth.registration.urls')),
            url('rest-auth/', include('rest_auth.urls'))
            ]
