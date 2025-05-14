import os
from flask import Blueprint, request, redirect, url_for, flash, render_template
from werkzeug.utils import secure_filename
from backend.models import db, Adoption, Donation

admin = Blueprint("admin", __name__, template_folder="templates")


UPLOAD_FOLDER = "backend/static/uploads" 
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@admin.route("/")
def admin_dashboard():
    pets = Adoption.query.all()  
    donations = Donation.query.all()
    return render_template("admin_dashboard.html", pets=pets, donations=donations)


@admin.route("/admin/upload", methods=["POST"])
def upload_pet():
    if "image" not in request.files:
        flash("No image file found")
        return redirect(url_for("admin.admin_dashboard"))

    file = request.files["image"]
    pet_name = request.form.get("pet_name")
    age = request.form.get("age")
    gender = request.form.get("gender")
    breed = request.form.get("breed")
    description = request.form.get("description")

    if not all([pet_name, age, gender, breed, description]):
        flash("All fields are required!")
        return redirect(url_for("admin.admin_dashboard"))

    if file.filename == "":
        flash("No selected file")
        return redirect(url_for("admin.admin_dashboard"))

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join("uploads", filename)  
        full_path = os.path.join("backend/static", file_path)  
        file.save(full_path) 
        

        
        new_pet = Adoption(
            pet_name=pet_name,
            age=age,
            gender=gender,
            breed=breed,
            description=description,
            image_path=file_path 
        )
        db.session.add(new_pet)
        db.session.commit()

        flash("Pet uploaded successfully!")
        return redirect(url_for("admin.admin_dashboard"))

    flash("Invalid file type")
    return redirect(url_for("admin.admin_dashboard"))


@admin.route("/upload")
def admin_upload():
    return render_template("admin_upload.html")

@admin.route("/admin/delete/<int:pet_id>", methods=["POST"])
def delete_pet(pet_id):
    pet = Adoption.query.get(pet_id)  
    if pet:
        db.session.delete(pet)
        db.session.commit()
        flash("Pet removed successfully!", "success")
    else:
        flash("Pet not found!", "danger")
    
    return redirect(url_for("admin.admin_dashboard"))

