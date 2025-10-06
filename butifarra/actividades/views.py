import json

from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect, render
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, get_user_model, login, logout
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm

def index(request):
    return HttpResponse("Bienvenidos al Centro Artístico y Deportivo")

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            # Autenticar usuario
            user = form.get_user()
            login(request, user)
            return redirect('index')  # Redirigir a la página principal o dashboard
    else:
        form = AuthenticationForm()

    return render(request, 'login.html', {'form': form})

def register_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)  # Iniciar sesión automáticamente al registrar
            return redirect('/')  # Redirigir a la página principal
    else:
        form = UserCreationForm()

    return render(request, 'register.html', {'form': form})

def logout_view(request):
    logout(request)
    return redirect('/')


def _serialize_user(user):
    """Return a JSON-serializable representation of a user."""

    return {
        "id": user.id,
        "username": user.get_username(),
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
    }


def _load_body(request):
    try:
        if not request.body:
            return {}
        return json.loads(request.body.decode("utf-8"))
    except (TypeError, ValueError, json.JSONDecodeError):
        return None


def _resolve_username(identifier):
    if not identifier:
        return None

    if "@" not in identifier:
        return identifier

    UserModel = get_user_model()
    try:
        user = UserModel.objects.get(email__iexact=identifier)
    except UserModel.DoesNotExist:
        return None

    return user.get_username()


@csrf_exempt
def api_login(request):
    if request.method != "POST":
        return JsonResponse({"ok": False, "error": "Method not allowed"}, status=405)

    payload = _load_body(request)
    if payload is None:
        return JsonResponse({"ok": False, "error": "Invalid JSON"}, status=400)

    identifier = payload.get("username") or payload.get("email")
    password = payload.get("password")

    if not identifier or not password:
        return JsonResponse({"ok": False, "error": "Missing credentials"}, status=400)

    username = _resolve_username(identifier)
    if username is None:
        username = identifier

    user = authenticate(request, username=username, password=password)
    if user is None:
        return JsonResponse({"ok": False, "error": "Invalid credentials"}, status=401)

    login(request, user)
    return JsonResponse({"ok": True, "user": _serialize_user(user)}, status=200)


@csrf_exempt
def api_logout(request):
    if request.method != "POST":
        return JsonResponse({"ok": False, "error": "Method not allowed"}, status=405)

    if not request.user.is_authenticated:
        return JsonResponse({"ok": False, "error": "Not authenticated"}, status=401)

    logout(request)
    return JsonResponse({"ok": True}, status=200)


@csrf_exempt
def api_session(request):
    if request.method != "GET":
        return JsonResponse({"ok": False, "error": "Method not allowed"}, status=405)

    if not request.user.is_authenticated:
        return JsonResponse({"ok": False}, status=401)

    return JsonResponse({"ok": True, "user": _serialize_user(request.user)}, status=200)
