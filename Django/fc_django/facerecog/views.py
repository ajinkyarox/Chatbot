# pages/views.py
import os
import base64
from django.http import HttpResponse
from .models import EmpDetails,Attendance,LoginCredentials,CollegeDetails,Courses
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import QueryDict
from os import path
import json
import cv2
import numpy as np
import re
from re import search
import datetime,calendar
from datetime import date
import xlsxwriter
from cryptography.fernet import Fernet
import win32com.client as wincl
from gtts import gTTS
import pythoncom
import win32com.client as wincl
import nltk
from nltk.stem.lancaster import LancasterStemmer
stemmer = LancasterStemmer()

import numpy
import tflearn
import tensorflow
import random
import json
import pickle


def homePageView(request):
    return HttpResponse('Hello from Django!')

def getEmpDetails(request):
    data=list(EmpDetails.objects.values())
    return JsonResponse(data, safe=False)

@csrf_exempt
def addEmployee(request):
    response=''
    newemp = EmpDetails()

    if request.method == "POST":
        response='Success'
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)


        newemp.firstname=body_data['firstname']
        newemp.lastname = body_data['lastname']
        if EmpDetails.objects.filter(firstname=body_data['firstname'],lastname=body_data['lastname']).first()!=None:
            print("Duplicate")
            newemp=None
            response = {'status': 'Failure', 'responseObject': newemp}
        elif body_data['firstname'].strip()!="" and body_data['lastname'].strip()!="":

            newemp.save()
            newemp=EmpDetails.objects.filter(firstname=body_data['firstname'],lastname=body_data['lastname']).first()
            print(newemp.id)
            newemp={'id':newemp.id,'firstname':newemp.firstname,'lastname':newemp.lastname}
            response={'status':'Success','responseObject':newemp}
        else:
            response = {'status': 'Failure', 'responseObject': None}
    else:
        response={'status':'Failure','responseObject':None}
    return JsonResponse(response, safe=False)

@csrf_exempt
def updateEmployee(request):
    response = ''
    newemp = EmpDetails()
    try:
        if request.method == "PUT":
            response = 'Success'
            body_unicode = request.body.decode('utf-8')
            body_data = json.loads(body_unicode)


            if EmpDetails.objects.get(id=body_data['id']) != None and body_data['firstname'].strip()!="" and body_data['lastname'].strip()!="":
                #newemp.firstname = body_data['firstname']
                #newemp.lastname = body_data['lastname']
                newemp=EmpDetails.objects.filter(id=body_data['id']).update(firstname=body_data['firstname'],lastname=body_data['lastname'])
                #newemp.save(update_fields=["active"])
                #print(newemp.id)
                #newemp = {'id': newemp.id, 'firstname': newemp.firstname, 'lastname': newemp.lastname}
                response = {'status': 'Success', 'responseObject': None}
                print("Success")
            else:
                print("Does not exist.")
                newemp = None
                response = {'status': 'Failure', 'responseObject': None}

        else:
            response = {'status': 'Failure', 'responseObject': None}
    except:
        print("There is some problem.")
        response = {'status': 'Failure', 'responseObject': None}
    return JsonResponse(response, safe=False)

@csrf_exempt
def deleteEmployee(request):
    response = ''
    newemp = EmpDetails()

    try:
        if request.method == "DELETE":
            response = 'Success'
            #body_unicode = request.body.decode('utf-8')
            #body_data = json.loads(body_unicode)
            id = request.GET['id']
            if EmpDetails.objects.get(id=id) != None:
                newemp=EmpDetails.objects.get(id=id)
                newemp.delete()
                response = {'status': 'Success', 'responseObject': None}
            else:
                #newemp = {'id': newemp.id, 'firstname': newemp.firstname, 'lastname': newemp.lastname}
                response = {'status': 'Failure', 'responseObject': None}
        else:
            response = {'status': 'Failure', 'responseObject': None}

    except:
        print("There's something wrong")
        #newemp = {'id': newemp.id, 'firstname': newemp.firstname, 'lastname': newemp.lastname}
        response = {'status': 'Failure', 'responseObject': None}
    return JsonResponse(response, safe=False)

@csrf_exempt
def savePhoto(request):
    response=''
    if request.method == "POST":
        try:

            body_unicode = request.body.decode('utf-8')
            body_data = json.loads(body_unicode)
            arr=body_data['photo'].split(",")

            if EmpDetails.objects.get(id=body_data['id']) != None:

                cwdname=os.path.abspath(os.getcwd())+os.path.sep+"TrainingData"+os.path.sep+str(body_data['id'])
                filepath = os.path.join(cwdname, body_data['filename'])
                if not os.path.exists(cwdname):
                    os.makedirs(cwdname)
                if path.exists(filepath)==False:
                    with open(filepath, "wb") as fh:
                        fh.write(base64.decodebytes(arr[1].encode('utf-8')))
                        response = {'status': 'Success', 'responseObject': None}
                        print("Success- -1")
                        faces=labels_for_training_data(cwdname)
                        print("Interim")
                        face_recognizer = train_classifier(faces, body_data['id'])
                        print("Success-0")
                        face_recognizer.write(cwdname+os.path.sep+'trainingData.yml')
                        print("Success-1")
                else:
                    response = {'status': 'Failure', 'responseObject': None}


            else:
                print("Else")
                response = {'status': 'Failure', 'responseObject': None}
        except Exception as e:
            print("PROBLEM.:-"+str(e))
            response = {'status': 'Failure', 'responseObject': None}
    else:
        response = {'status': 'Failure', 'responseObject': "Not Allowed"}
    return JsonResponse(response)

@csrf_exempt
def markAttendance(request):
    print(request)
    response = {'status': 'Failure', 'responseObject': None}
    conf = 0
    cid = 0
    try:

        result=0
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        arr = body_data['photo'].split(",")
        print(arr[1])
        os.makedirs("Temp")
        fp=os.path.abspath(os.getcwd())+os.path.sep+"Temp"
        fp=os.path.join(fp, "temp.jpg")
        with open(fp, "wb") as fh:
            fh.write(base64.decodebytes(arr[1].encode('utf-8')))

        test_img = cv2.imread(fp)  # test_img path
        faces_detected, gray_img = faceDetection(test_img)
        print("faces_detected:", faces_detected)
        face_recognizer = cv2.face.LBPHFaceRecognizer_create()
        ids=EmpDetails.objects.values('id')

        for i in range(len(ids)):
            r = ids[i]
            r = json.dumps(r)
            loaded_r = json.loads(r)
            print("ID",loaded_r['id'])
            if os.path.exists(os.getcwd()+os.path.sep+ "TrainingData" + os.path.sep + str(loaded_r['id'])+os.path.sep+"trainingData.yml"):
                print("L1")
                filepath=os.getcwd()+os.path.sep+ "TrainingData" + os.path.sep + str(loaded_r['id'])+os.path.sep+"trainingData.yml"
                face_recognizer.read(filepath)
                print("ID", loaded_r['id'])
                for face in faces_detected:
                    (x, y, w, h) = face
                    roi_gray = gray_img[y:y + h, x:x + h]
                    label, confidence = face_recognizer.predict(roi_gray)  # predicting the label of given image
                    print("Confidence",confidence)

                    if (datetime.datetime.today().weekday()==0 or datetime.datetime.today().weekday()==6):
                        response = {'status': 'Failure', 'responseObject': None}
                    else:
                        if confidence<37:
                            conf=confidence
                            cid=loaded_r['id']
                            break



        if cid!=0:
            att = Attendance()
            print(EmpDetails.objects.get(id=cid).firstname+" is present")
            att.eid = cid
            att.attendance = 1
            now = datetime.datetime.now()
            date_time = now.strftime("%m/%d/%Y, %H:%M:%S")
            print("date and time:", date_time)
            att.datetime = date_time

            att.save()
            response = {'status': 'Present', 'responseObject': None}
    except Exception as e:
        print("Exception is.:-"+str(e))
        response = {'status': 'Failure', 'responseObject': None}

    os.remove((os.path.abspath(os.getcwd())+os.path.sep+"Temp"+os.path.sep+"temp.jpg"))
    os.rmdir(os.path.abspath(os.getcwd())+os.path.sep+"Temp")
    return JsonResponse(response, safe=False)

def getAttendance(request):
    data = list(Attendance.objects.values())
    for i in range(len(data)):
        print("Created at %s:%s" % (data[i]['datetime'].hour, data[i]['datetime'].minute))
        data[i]['datetime']=data[i]['datetime'].strftime("%m/%d/%Y, %H:%M:%S")

    return JsonResponse(data, safe=False)


@csrf_exempt
def getMonthlyReport(request):
    response = {'status': 'Failure', 'responseObject': None}
    try:
        print("A1")
        body_unicode = request.body.decode('utf-8')

        body_data = json.loads(body_unicode)
        attObj=[]
        attObj=Attendance.objects.filter(eid=body_data['eid'])
        fname=EmpDetails.objects.get(id=body_data['eid']).firstname
        lname=EmpDetails.objects.get(id=body_data['eid']).lastname
        print("A2")
        filename=os.getcwd()+os.path.sep+"Temp"+os.path.sep+fname+" "+lname+" "+"Monthly Attendace Report.xlsx"
        os.mkdir(os.getcwd()+os.path.sep+"Temp")
        workbook = xlsxwriter.Workbook(filename)
        worksheet = workbook.add_worksheet()
        format = workbook.add_format()
        format.set_bg_color('gray')
        format.set_bold()
        worksheet.write(0,0,"Date",format)
        worksheet.write(0, 1, "Attendance", format)
        worksheet.write(0, 2, "In-Time", format)

        u=1

        n=len(attObj)
        print(attObj[0].datetime)
        for i in range(n):

            for j in range(3):
                if j==0:
                    date=attObj[u-1].datetime.strftime("%m/%d/%Y, %H:%M:%S")
                    arr=date.split(",")
                    worksheet.write(u, j,arr[0])
                elif j==1:
                    worksheet.write(u, j, 1)
                elif j==2:
                    date = attObj[u-1].datetime.strftime("%m/%d/%Y, %H:%M:%S")
                    arr = date.split(",")
                    worksheet.write(u, j, arr[1])
            u=u+1
        workbook.close()

        data = open(filename, 'rb').read()
        base64_encoded = base64.b64encode(data).decode('UTF-8')

        response = {'status': 'Success', 'filename': fname+" "+lname+" "+"Monthly Attendace Report.xlsx",'responseObject': base64_encoded}
        os.remove(filename)
        os.rmdir(os.getcwd()+os.path.sep+"Temp")
    except Exception as e:
        print("Exception.:-"+str(e))
        if os.path.exists(filename):
            os.remove(filename)
            os.rmdir(os.getcwd() + os.path.sep + "Temp")
        if os.path.exists(os.getcwd()+os.path.sep+"Temp"):
            os.rmdir(os.getcwd() + os.path.sep + "Temp")
    return JsonResponse(response,safe=False)


@csrf_exempt
def addLoginCredentials(request):
    response={'status': 'Failure', 'responseObject': None}
    try:
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        user=None
        try:
            user = LoginCredentials.objects.get(username=body_data['username'])
        except LoginCredentials.DoesNotExist:
            user = None
        if user==None:
            loginCred=LoginCredentials()
            loginCred.username=body_data['username']
            key = Fernet.generate_key()
            print(key)
            cipher_suite = Fernet(key)
            ciphered_text = cipher_suite.encrypt(body_data['password'])  # required to be bytes

            print(ciphered_text)

            loginCred.password=body_data['password']
            loginCred.firstname=body_data['firstname']
            loginCred.lastname=body_data['lastname']
            loginCred.save()
            response = {'status': 'Success', 'responseObject': None}
        else:
            response = {'status': 'Failure:UserName already exists', 'responseObject': None}
    except Exception as e:
        print(str(e))
        response = {'status': 'Failure:There is some problem', 'responseObject': None}
    return JsonResponse(response,safe=False)

@csrf_exempt
def login(request):
    response = {'status': 'Failure', 'responseObject': None}
    try:
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        user = None
        try:
            user =LoginCredentials.objects.get(username=body_data['username'],password=body_data['password'])
        except LoginCredentials.DoesNotExist:
            user = None
        if  user!= None:
            response = {'status': 'Success', 'responseObject': None}
        else:
            response = {'status': 'Failure:Invalid username/password', 'responseObject': None}
    except Exception as e:
        print(str(e))
        response = {'status': 'Failure', 'responseObject': None}
    return JsonResponse(response,safe=False)
def faceDetection(test_img):
    gray_img=cv2.cvtColor(test_img,cv2.COLOR_BGR2GRAY)#convert color image to grayscale
    print("H1")
    cwdname = os.path.abspath(os.getcwd() + os.path.sep + "haarcascade_frontalface_default.xml")
    print("H2")
    face_haar_cascade=cv2.CascadeClassifier(cwdname)#Load haar classifier
    faces=face_haar_cascade.detectMultiScale(gray_img,scaleFactor=1.32,minNeighbors=5)#detectMultiScale returns rectangles

    print("H3")
    return faces,gray_img

#Given a directory below function returns part of gray_img which is face alongwith its label/ID
def labels_for_training_data(directory):
    faces=[]

    for path,subdirnames,filenames in os.walk(directory):
        for filename in filenames:
            print(filename)
            if filename.startswith("."):
                print("Skipping system file")#Skipping files that startwith .
                continue
            #elif search("jpg",filename) and search("png",filename) and search("JPG",filename) and search("PNG",filename):
            print("Training...")
            id=os.path.basename(path)#fetching subdirectory names
            img_path=os.path.join(path,filename)#fetching image path
            print("img_path:",img_path)
            print("id:",id)
            test_img=cv2.imread(img_path)#loading each image one by one
            print("T1")
            if test_img is None:
                print("Image not loaded properly")
                continue
            print("T2")
            faces_rect,gray_img=faceDetection(test_img)#Calling faceDetection function to return faces detected in particular image
            if len(faces_rect)!=1:
                continue #Since we are assuming only single person images are being fed to classifier
            (x,y,w,h)=faces_rect[0]
            roi_gray=gray_img[y:y+w,x:x+h]#cropping region of interest i.e. face area from grayscale image
            faces.append(roi_gray)
    print(len(faces))
    return faces


#Below function trains haar classifier and takes faces,faceID returned by previous function as its arguments
def train_classifier(faces,faceID):
    faceID=np.full(len(faces),faceID)
    face_recognizer=cv2.face.LBPHFaceRecognizer_create()
    face_recognizer.train(faces,faceID)
    return face_recognizer

#Below function draws bounding boxes around detected face in image
def draw_rect(test_img,face):
    (x,y,w,h)=face
    cv2.rectangle(test_img,(x,y),(x+w,y+h),(255,0,0),thickness=5)

#Below function writes name of person for detected label
def put_text(test_img,text,x,y):
    cv2.putText(test_img,text,(x,y),cv2.FONT_HERSHEY_DUPLEX,2,(255,0,0),4)

@csrf_exempt
def mcresponse(request):
    response={'status':"Failure",'respmsg':"",'respvoice':""}
    try:

        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)

        msg=body_data['msg']
        if msg.lower()=="hi" or msg.lower()=="hello":
            voice=getTextToSpeech("Hello")
            response={'status':"Success",'respmsg':"Hello",'respvoice':voice}
        elif os.path.exists(os.getcwd()+os.path.sep+"intents.json")==False:
            print(os.getcwd()+" DOES NOT")
            voice = getTextToSpeech("Unable to understand you.Sorry.")
            response = {'status': "Success", 'respmsg': "Unable to understand you.Sorry.", 'respvoice': voice}
        elif os.path.exists(os.getcwd()+os.path.sep+"intents.json"):
            print("EXISTS")

            print("uuuuu")
            if os.path.exists(os.getcwd()+os.path.sep+"data.pickle")==False:
                dataPickle()
            print("ffff")
            with open("data.pickle", "rb") as f:
                words, labels, training, output = pickle.load(f)
            tensorflow.reset_default_graph()

            net = tflearn.input_data(shape=[None, len(training[0])])
            net = tflearn.fully_connected(net, 8)
            net = tflearn.fully_connected(net, 8)
            net = tflearn.fully_connected(net, len(output[0]), activation="softmax")
            net = tflearn.regression(net)

            model = tflearn.DNN(net)

            model.load("model.tflearn")
            results = model.predict([bag_of_words(msg, words)])
            print(results)

            num = results[0][0] * 10
            num2=results[0][1]*10
            print(num2)
            if num > 1 and num2>1:
                voice = getTextToSpeech("Unable to understand you.Sorry.")
                response = {'status': "Success", 'respmsg': "Unable to understand you.Sorry.", 'respvoice': voice}
            else:


                results_index = numpy.argmax(results)
                print(results_index)
                tag = labels[results_index]

                with open(os.getcwd() + os.path.sep + "intents.json") as f:
                    data = json.load(f)

                    for tg in data['intents']:

                        if tg['tag'] == tag:
                            print(tg['tag'])
                            resp = tg['responses']
                            respf=''
                            print(respf)
                            if tg['context_set']!=None and tg['context_set'].strip()!='':

                                if tg['context_set']=='college_name':

                                    #EmpDetails.objects.get(id=body_data['id'])
                                    cname=uniqueWords(msg,words).lower()
                                    listOfColleges=list(CollegeDetails.objects.values())
                                    cnt1=0
                                    for i in listOfColleges:

                                        print(cname+" "+i['name'])
                                        if is_part(i['name'],cname) or is_part(i['shortForm'],cname):
                                            c_id=i['id']
                                            print("Found----"+cname)
                                            respf = i['name'] + ' is located in ' + i['address']
                                            courses=[]
                                            print(i['id'])
                                            courses=Courses.objects.filter(cid=c_id)
                                            if len(courses)>0:
                                                respf = respf + ' and offers courses like '
                                                cnt=0
                                                for k in courses:
                                                    cnt = cnt + 1
                                                    if cnt==((len(courses))):
                                                        respf=respf + ' & '+str(k.name)+'.'
                                                    else:
                                                        respf = respf + str(k.name) +', '


                                            break
                                        else:
                                            cnt1 = cnt1 + 1
                                    cnt2=str(cnt1)
                                    cnt3=str(len(listOfColleges))
                                    flg1=(cnt3==cnt2)
                                    print(str(flg1)+"====")
                                    flg1=str(flg1)
                                    print(flg1)
                                    if flg1=="True":
                                        print("yyyy")
                                        voice = getTextToSpeech("Requested college details not found in the database. Sorry.")
                                        respf="Requested college details not found in the database. Sorry."
                                        response = {'status': "Success", 'respmsg': respf,
                                                    'respvoice': voice}
                                elif tg['context_set']=='admissionCriteria':
                                    print('Admission Criteria')
                                    cname = uniqueWords(msg, words).lower()
                                    listOfColleges = list(CollegeDetails.objects.values())
                                    cnt1 = 0
                                    for i in listOfColleges:
                                        print(is_part(i['shortForm'], cname))
                                        if is_part(i['name'], cname) or is_part(i['shortForm'], cname):
                                            respf = 'The criteria to secure admission in '+i['name'] +' is '+' '+str(i['admitCriteria'])+'% in 12th grade (HSC).'
                                            print(respf)
                                            break
                                        else:
                                            cnt1=cnt1+1

                                    cnt2 = str(cnt1)
                                    cnt3 = str(len(listOfColleges))
                                    flg1 = (cnt3 == cnt2)
                                    print(str(flg1) + "====")
                                    flg1 = str(flg1)
                                    print(flg1)
                                    if flg1 == "True":

                                        voice = getTextToSpeech(
                                            "Requested college details not found in the database. Sorry.")
                                        respf = "Requested college details not found in the database. Sorry."
                                        response = {'status': "Success", 'respmsg': respf,
                                                    'respvoice': voice}
                                elif tg['context_set']=='fees':
                                    print('FEES')
                                    cname = uniqueWords(msg, words).lower()
                                    listOfColleges = list(CollegeDetails.objects.values())
                                    cnt1 = 0
                                    for i in listOfColleges:
                                        print(is_part(i['shortForm'], cname))
                                        if is_part(i['name'], cname) or is_part(i['shortForm'], cname):
                                            print("Is Part for fees "+i['name'] + ' '+i['fees'])
                                            respf = 'The fee for '+i['name']+' is '+i['fees']+' Rupees per year.'
                                            print(respf)
                                            break
                                        else:
                                            cnt1=cnt1+1

                                    cnt2 = str(cnt1)
                                    cnt3 = str(len(listOfColleges))
                                    flg1 = (cnt3 == cnt2)
                                    print(str(flg1) + "====")
                                    flg1 = str(flg1)
                                    print(flg1)
                                    if flg1 == "True":

                                        voice = getTextToSpeech(
                                            "Requested college details not found in the database. Sorry.")
                                        respf = "Requested college details not found in the database. Sorry."
                                        response = {'status': "Success", 'respmsg': respf,
                                                    'respvoice': voice}
                            else:
                                respf = random.choice(resp)
                            voice = getTextToSpeech(respf)
                            response = {'status': "Success", 'respmsg': respf,
                                        'respvoice': voice}

                            break
        else:
            voice = getTextToSpeech("Unable to understand you.Sorry.")
            response = {'status': "Success", 'respmsg': "Unable to understand you.Sorry.", 'respvoice': voice}
    except Exception as e:
        print(str(e))

    return JsonResponse(response,safe=False)



def is_part(some_string, target):
    return target in some_string

def dataPickle():
    words = []
    labels = []
    docs_x = []
    docs_y = []

    with open(os.getcwd() + os.path.sep + "intents.json") as f:
        data = json.load(f)
        for intent in data["intents"]:
            for pattern in intent["patterns"]:
                wrds = nltk.word_tokenize(pattern)
                words.extend(wrds)
                docs_x.append(wrds)
                docs_y.append(intent["tag"])

            if intent["tag"] not in labels:
                labels.append(intent["tag"])

    words = [stemmer.stem(w.lower()) for w in words if w != "?"]
    words = sorted(list(set(words)))

    labels = sorted(labels)
    training = []
    output = []

    out_empty = [0 for _ in range(len(labels))]

    for x, doc in enumerate(docs_x):
        bag = []

        wrds = [stemmer.stem(w.lower()) for w in doc]

        for w in words:
            if w in wrds:
                bag.append(1)
            else:
                bag.append(0)

        output_row = out_empty[:]
        output_row[labels.index(docs_y[x])] = 1

        training.append(bag)
        output.append(output_row)

    training = numpy.array(training)
    output = numpy.array(output)

    with open("data.pickle", "wb") as f:
        pickle.dump((words, labels, training, output), f)

    tensorflow.reset_default_graph()

    net = tflearn.input_data(shape=[None, len(training[0])])
    net = tflearn.fully_connected(net, 8)
    net = tflearn.fully_connected(net, 8)
    net = tflearn.fully_connected(net, len(output[0]), activation="softmax")
    net = tflearn.regression(net)

    model = tflearn.DNN(net)

    model.fit(training, output, n_epoch=1000, batch_size=8, show_metric=True)
    model.save("model.tflearn")

def bag_of_words(s, words):
    bag = [0 for _ in range(len(words))]

    s_words = nltk.word_tokenize(s)
    s_words = [stemmer.stem(word.lower()) for word in s_words]

    for se in s_words:
        for i, w in enumerate(words):
            if w == se:
                bag[i] = 1

    return numpy.array(bag)

def uniqueWords(msg,words):
    resword=''
    bag = [0 for _ in range(len(words))]
    s_words = nltk.word_tokenize(msg)
    s_words = [stemmer.stem(word.lower()) for word in s_words]
    allwords=msg.lower().split(" ")
    for w in allwords:
        cnt=0
        for s in words:
            if w!='a' and w!='of' and w!='and' and w!='engineering' and w!='research' and w!='college' and w!=s and w!='institute'\
                    and w!='technology' and w!='admission' and w!='criteria' and w!='what' and w!='for' and w!='regarding' and w!='fee'\
                    and w!='fees' and w!='information' and w!='please' and w!='give':
                cnt=cnt+1
        if cnt==len(words):
            print(w)
            resword= w
    return resword




@csrf_exempt
def getTextToSpeech(msg):
    base64_encoded=''
    try:
        pythoncom.CoInitialize()

        if os.path.exists(os.getcwd() + os.path.sep + "Temp" ) == False:
            os.mkdir(os.getcwd() + os.path.sep + "Temp" )
        speak = wincl.Dispatch("SAPI.SpVoice")

        tts = gTTS(text=msg, lang='en')

        tts.save(os.getcwd() + os.path.sep + "Temp" + os.path.sep + "pcvoice.mp3")
        print("TTT")
        data =''
        with open(os.getcwd() + os.path.sep + "Temp" + os.path.sep + "pcvoice.mp3", 'rb') as f:
            data = f.read()
        print("XXX")
        base64_encoded = base64.b64encode(data).decode('UTF-8')
        print("CCC")

        os.remove(os.getcwd()+os.path.sep+"Temp"+os.path.sep+"pcvoice.mp3")
        os.rmdir(os.getcwd()+os.path.sep+"Temp")
    except Exception as e:
        if os.path.exists(os.getcwd() + os.path.sep + "Temp" + os.path.sep + "pcvoice.mp3"):
            os.remove(os.getcwd()+os.path.sep+"Temp"+os.path.sep+"pcvoice.mp3")
            os.rmdir(os.getcwd() + os.path.sep + "Temp")
        elif os.path.exists(os.getcwd() + os.path.sep + "Temp"):
            os.rmdir(os.getcwd() + os.path.sep + "Temp")
        print(str(e))

    return base64_encoded