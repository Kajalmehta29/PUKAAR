from flask import Blueprint

admin_bp = Blueprint('admin_dashboard', __name__, static_folder='static', template_folder='templates')

from . import admin  
