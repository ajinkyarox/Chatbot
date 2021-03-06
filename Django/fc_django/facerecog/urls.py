# pages/urls.py
from django.urls import path
from .views import addCollege,updateFeeDetails,getCourseDetails,addFeeDetails,addCourse,getFeeDetails,deleteCourse,updateCourse,deleteCollege,updateCollege,getEmpDetails,getCollegeDetails,addEmployee,updateEmployee,deleteEmployee,savePhoto,markAttendance,getAttendance,getMonthlyReport,addLoginCredentials,mcresponse,login,getTextToSpeech
from facerecog import views

urlpatterns = [

    path('empdetails', getEmpDetails, name='getEmpDetails'),
    path('addEmployee', addEmployee, name='addEmployee'),
    path('updateEmployee', updateEmployee, name='updateEmployee'),
    path('deleteEmployee', deleteEmployee),
    path('savePhoto', savePhoto, name='savePhoto'),
    path('markAttendance',markAttendance,name='markAttendance'),
    path('getAttendance',getAttendance,name='getAttendance'),
    path('getMonthlyReport',getMonthlyReport,name='getMonthlyReport'),
    path('login',login,name='login'),
    path('addLoginCredentials',addLoginCredentials,name='addLoginCredentials'),
    path('getTextToSpeech', getTextToSpeech, name='getTextToSpeech'),
    path('mcresponse', mcresponse, name='mcresponse'),
    path('getCollegeDetails', getCollegeDetails, name='getCollegeDetails'),
    path('addCollege', addCollege, name='addCollege'),
    path('updateCollege',updateCollege,name='updateCollege'),
    path('deleteCollege',deleteCollege),
    path('getCourseDetails',getCourseDetails),
    path('addCourse',addCourse,name='addCourse'),
    path('updateCourse',updateCourse,name='updateCourse'),
    path('deleteCourse',deleteCourse,name='deleteCourse'),
    path('getFeeDetails',getFeeDetails,name='getFeeDetails'),
    path('updateFeeDetails',updateFeeDetails,name='updateFeeDetails'),
    path('addFeeDetails',addFeeDetails,name='addFeeDetails')
]

