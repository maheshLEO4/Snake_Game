from django.shortcuts import render, redirect, get_object_or_404
from .models import Student
from .forms import StudentForm

def add_student(request):
    if request.method == 'POST':
        form = StudentForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('display_students')
    else:
        form = StudentForm()
    return render(request, 'app/add_student.html', {'form': form})

def display_students(request):
    students = Student.objects.all()
    return render(request, 'app/display_students.html', {'students': students})

def edit_student(request, student_id):
    student = get_object_or_404(Student, id=student_id)
    if request.method == 'POST':
        form = StudentForm(request.POST, instance=student)
        if form.is_valid():
            form.save()
            return redirect('display_students')
    else:
        form = StudentForm(instance=student)
    return render(request, 'app/edit_student.html', {'form': form, 'student': student})

def delete_student(request, student_id):
    student = get_object_or_404(Student, id=student_id)
    if request.method == 'POST':
        student.delete()
        return redirect('display_students')
    return redirect('display_students')
