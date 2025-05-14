from flask import Flask, render_template, request,send_file, url_for, jsonify, redirect, flash
import sqlite3
from flask_sqlalchemy import SQLAlchemy
from fpdf import FPDF
from backend.models import db, Adoption, Donation 
from backend.admin.admin import admin  
from flask_migrate import Migrate

app = Flask(__name__, static_folder="static") 


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = "supersecretkey"
migrate = Migrate(app, db)  
db.init_app(app)

app.register_blueprint(admin, url_prefix="/admin")
with app.app_context():
        db.create_all() 
class PDF(FPDF):
    def header(self):
        self.set_font("NotoSans", "", 16)
        self.cell(200, 10, "Pukaar Animal Shelter - Donation Receipt", ln=True, align='C')
        self.ln(10)



@app.route("/")
def home():
    return render_template("index.html")



@app.route("/babies")
def babies():
    return render_template("babies.html")

@app.route("/Our_Work")
def Our_Work():
    return render_template("Our_Work.html")

@app.route("/Help_Us")
def Help_Us():
    return render_template("Help_Us.html")

@app.route("/faq")
def faq():
    return render_template("faq.html")
@app.route("/gallery")
def gallery():
    return render_template("gallery.html")
@app.route("/guidelines")
def guidelines():
    return render_template("guidelines.html")
@app.route("/contact")
def contact():
    return render_template("contact.html")


@app.route('/donate/food')
def donate_food():
    return render_template('donate/donate_food.html')



@app.route('/donate/vet')
def donate_vet():
    return render_template('donate/donate_vet.html')

@app.route('/donate/construction')
def donate_construction():
    return render_template('donate/donate_construction.html')

@app.route('/donate/taxi')
def donate_taxi():
    return render_template('donate/donate_taxi.html')

@app.route("/donate", methods=["POST"])
def donate():
    donor_name = request.form.get("donor_name")
    
    amount = request.form.get("amount")
    category = request.form.get("category")
    aadhar = request.form.get("aadhar") 

    if not donor_name  or not amount or not category:
        flash("All fields except Aadhaar are required!")
        return redirect(url_for("donate_page"))

    new_donation = Donation(
        donor_name=donor_name,
        amount=float(amount),
        category=category,
        aadhar=aadhar if aadhar else None  
    )
    db.session.add(new_donation)
    db.session.commit()

    flash("Thank you for your donation!")
    return redirect(url_for("thank_you"))

@app.route('/donate/general', methods=['GET', 'POST'])
def donate_general():
    return donate('general')


@app.route('/thank-you')
def thank_you():
    return "<h1>Thank you for your donation! 🙏</h1>"

@app.route("/adopt")
def adopt():
    pets = Adoption.query.all() 
    return render_template("adopt.html", pets=pets)


if __name__ == "__main__":
 
    app.run(debug=True)





