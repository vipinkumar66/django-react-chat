# Import necessary modules from Django framework
from django.conf import settings
from django.db import models
from django.dispatch import receiver
from django.shortcuts import get_object_or_404
from .validators import (validate_icon_image_size,
                         validate_icon_file_extension)

# Function to generate upload path for category icons
def upload_icon_category(instance, filename):
    return f"category/{instance.id}/category_icon/{filename}"

def server_upload_icon_category(instance, filename):
    return f"server/{instance.id}/server_icon/{filename}"

def server_upload_banner_category(instance, filename):
    return f"server/{instance.id}/server_banner/{filename}"

# Model representing a Category
class Category(models.Model):
    # Fields for category information
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    category_icon = models.FileField(
        upload_to=upload_icon_category,
        null=True,
        blank=True
    )

    # Overriding save method to handle category icon deletion if changed
    def save(self, *args, **kwargs):
        """
        Custom save method for the Category model. If an instance already has an ID,
        it checks whether the category_icon has changed. If it has, the old icon file is deleted.
        """
        if self.id:
            existing = get_object_or_404(Category, id=self.id)
            if existing.category_icon != self.category_icon:
                existing.category_icon.delete(save=False)
        self.name = self.name.lower()
        super(Category, self).save(*args, **kwargs)

    # Signal receiver to delete associated category icon file before the category is deleted
    @receiver(models.signals.pre_delete, sender="server.Category")
    def category_delete_file(sender, instance, **kwargs):
        for field in instance._meta.fields:
            if field.name == "category_icon":
                file = getattr(instance, field.name)
                if file:
                    file.delete(save=False)

    # String representation of the Category model
    def __str__(self):
        return self.name

# Model representing a Server
class Server(models.Model):
    # Fields for server information
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
                              related_name="server_owner")
    category = models.ForeignKey(Category, on_delete=models.CASCADE,
                                 related_name="server_category")
    description = models.CharField(max_length=250, null=True)
    members = models.ManyToManyField(settings.AUTH_USER_MODEL)

    banner = models.ImageField(
        upload_to=server_upload_banner_category,
        null=True,
        blank=True,
        validators=[validate_icon_file_extension]
        )
    icon = models.ImageField(
        upload_to=server_upload_icon_category,
        null=True,
        blank=True,
        validators=[validate_icon_image_size, validate_icon_file_extension]
        )

    # Overriding save method to modify the name field before saving
    def save(self, *args, **kwargs):
        """
        Custom save method for the Server model. It converts the name to lowercase
        before saving.
        """
        if self.id:
            existing_object = get_object_or_404(Server, id=self.id)
            print(existing_object)
            if existing_object.icon != self.icon:
                existing_object.icon.delete(save=False)
            if existing_object.banner != self.banner:
                existing_object.banner.delete(save=False)

        super(Server, self).save(*args, **kwargs)

    @receiver(models.signals.pre_delete, sender="server.Server")
    def server_delete_file(sender, instance, **kwargs):
        for field in instance._meta.fields:
            if field.name == "icon" or field.name == "banner":
                file = getattr(instance, field.name)
                if file:
                    file.delete(save=False)

    # String representation of the Server model
    def __str__(self):
        return self.name

# Model representing a Channel
class Channel(models.Model):
    # Fields for channel information
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
                              related_name="channel_owner")
    server = models.ForeignKey(Server, on_delete=models.CASCADE,
                               related_name="channel_server")
    topic = models.CharField(max_length=100)

    # String representation of the Channel model
    def __str__(self):
        return self.name
