import os
from PIL import Image
from django.core.exceptions import ValidationError


def validate_icon_image_size(image):
    if image:
        with Image.open(image) as img:
            if img.width>70 or img.height>70:
                raise ValidationError(
                    f"The image dimesions allowed are 70 x 70 and your image size is: {img.size}"
                )

def validate_icon_file_extension(value):
    extension = os.path.splitext(value.name)[1]
    allowed_extensions = [".jpg", ".jpeg", ".png", ".gif"]
    if extension.lower() not in allowed_extensions:
        raise ValidationError(
            "This file type is not supported"
        )