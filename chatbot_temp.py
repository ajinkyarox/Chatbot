
import os
from pandas import DataFrame, read_csv
import matplotlib.pyplot as plt
import pandas as pd 
 

os.system('color 3f') # sets the background to blue

#make Python speak
import win32com.client as wincl
from gtts import gTTS
speak = wincl.Dispatch("SAPI.SpVoice")

tts = gTTS(text="This is the pc speaking", lang='en')
tts.save("pcvoice.mp3")

def college_detail():
    data = pd.read_csv("punecolleges.csv", index_col ="Name")
    print('Enter College name you want to find?') #ask
    speak.Speak('Enter College name you want to find')
    college_name = input() #save answer
    
     # retrieving rows by iloc method  
    row2 = data.loc[college_name].dropna()
    print(row2)
    speak.Speak(row2)
    return 


def top_college():
    data = pd.read_csv("punecolleges.csv",index_col ="Level")
   
    data.sort_values("Level", inplace = True) 
 
    userInput="Graduate"
    # making boolean series for a team name 
    #filter = data[17]=="Post Graduate"
    #data.where(filter, inplace = True)
    row2=data.loc[userInput,"Name"].drop_duplicates()
    #row2=data.dropna()
    print(row2.head(10))
    speak.Speak(row2.head(10))
    return 

def loc_college():
    data = pd.read_csv("punecolleges.csv", index_col ="CITY")
    print('Enter city?') #ask
    speak.Speak('Enter city')
    city = input() #save answer
     # retrieving rows by iloc method 
    #filter = data["CITY"]==city
 
    # printing only filtered columns
    #data.where(filter).dropna()
    row2 = data.loc[city,"Name"].drop_duplicates()
    print(row2)
    speak.Speak(row2)
    return 

def max_intake():
    data = pd.read_csv("punecolleges.csv",index_col ="Intake")
    data.sort_values("Level", inplace = True) 
    userInput=120
    # making boolean series for a team name fillna()= Nan replace ""
    #filter = data[17]=="Post Graduate"dropna()-NaN
    #data.where(filter, inplace = True)
    row2=data.loc[userInput, "Name"].drop_duplicates()
    #row2=data.dropna()
    print(row2.head(10) )
    speak.Speak(row2.head(10))
    return 



    
#functions
def choice(i):
        switcher={                
                1:college_detail(),
                2:top_college,
                3:loc_college,
                4:max_intake,
                5:'Friday',
                6:'Saturday'
             }
        return switcher.get(i);

print('Hi!') #greeting
speak.Speak('Hi!')
print('I am Jarvis the admission assistant chatbot') #greeting
speak.Speak('I am Jarvis the admission assistant chatbot')
print('I am specially designed to help you in college admissions') #greeting
speak.Speak('I am specially designed to help you in college admissions')


#keep going the conversation
print('May I know your name?') #ask
speak.Speak('May I know your name?')
Name = input() #save answer
print('Im glad to meet you, ' + Name + '!!') #reply
speak.Speak('Im glad to meet you, ' + Name + '!!')

print('I can help you, ' + Name + 'in various way.!!') #reply
speak.Speak('I can help you , ' + Name + ' , in various way.!!')

print('Please tell me from following options') #reply
speak.Speak('Please tell me from following options?')


que1="1 To find given college details"
que2="2 To top colleges"
que3="3 To locate college"
que4="4 To find max intake colleges  "

print(que1)
speak.Speak(que1)
print(que2)
speak.Speak(que2)
print(que3)
speak.Speak(que3)
print(que4)
speak.Speak(que4)


# var declare
file = r'college.csv'
df = pd.read_csv(file)
data = pd.read_csv("punecolleges.csv", index_col ="Name")
print("Please enter your choice?")
speak.Speak("Please enter your choice?")
ch=input()
if ch=="1" :
    college_detail();
 
elif ch=="2":
    top_college();
    
elif(ch=="3"):
    loc_college();
elif(ch=="4"):
    max_intake();
    
else:
    print("Sorry I can't help you")
    speak.Speak("Sorry I can't help you")
  



#start the conversation

#keep going the conversation
print('How I can help you?') #ask
speak.Speak('How I can help you?')
Reply = input() #save answer
print('Okay, I am happy to meet you ' + Name  + ' .') #reply
speak.Speak('Okay, I am happy to meet you ' + Name  + ' .')
print('hope so I am helpful to you ' + Name  + ' Bye. See you again.') #reply
speak.Speak('hope so I am helpful to you ' + Name  + ' Bye. See you again.') 



