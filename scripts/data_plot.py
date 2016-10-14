# -*- coding: utf-8 -*-
"""
Created on Sun Jul 10 14:21:43 2016

@author: Marc
"""

import data_analyse

import matplotlib.pyplot as plt

plt.close("all")        #lukker alle åbne figure

#%%================================GYRO========================================
#PLOTTER gyrx,y,z DATA
plt.figure(1)
plt.plot(data_analyse.gyrx, color='r')
plt.plot(data_analyse.gyry, color='b')
plt.plot(data_analyse.gyrz, color='g')
plt.xlabel('Samples (500 samples = 1 sek)')
plt.ylabel('Vinkelhastighed (grad/s)')

#PLOTTER GENNEMSNIT AF GyrX,Y,Z
plt.figure(2)
plt.plot(data_analyse.GyrXmean, color='r', linewidth=2)
plt.plot(data_analyse.GyrYmean, color='b', linewidth=2)
plt.plot(data_analyse.GyrZmean, color='g', linewidth=2)
plt.title('GYRO\n Gennemsnit af 5 smashslag for hver af de tre rotationer') 
plt.xlabel('Samples (1 sek)')
plt.ylabel('Vinkelhastighed (grad/s)')
plt.grid(True)
plt.ylim([-3000,6000])
plt.legend(['X - flex/extens', 'Y - rotation', 'Z - ab-/adduct'], loc=2) 

#PLOTTER GyrX og GENNEMSNIT AF GyrX
plt.figure(3)  
for i in xrange(data_analyse.antalSlag):
    plt.plot(data_analyse.GyrX[i], color='k')                                
plt.title('X-rotation: x-antal slag + gns')                 
plt.xlabel('Samples (1 sek)')
plt.ylabel('Vinkelhastighed (grad/s)')
plt.grid(True)
plt.ylim([-3000,6000])
plt.plot(data_analyse.GyrXmean, color='r', linewidth=2)

#PLOTTER GyrY og GENNEMSNIT AF GyrY
plt.figure(4)  
for i in xrange(data_analyse.antalSlag):
    plt.plot(data_analyse.GyrY[i], color='k')                                
plt.title('Y-rotation: x-antal slag + gns')                 
plt.xlabel('Samples (1 sek)')
plt.ylabel('Vinkelhastighed (grad/s)')
plt.grid(True)
plt.ylim([-3000,6000])
plt.plot(data_analyse.GyrYmean, color='r', linewidth=2)

#PLOTTER GyrZ og GENNEMSNIT AF GyrZ
plt.figure(5)  
for i in xrange(data_analyse.antalSlag):
    plt.plot(data_analyse.GyrZ[i], color='k')                                
plt.title('Z-rotation: x-antal slag + gns')                 
plt.xlabel('Samples (1 sek)')
plt.ylabel('Vinkelhastighed (grad/s)')
plt.grid(True)
plt.ylim([-3000,6000])
plt.plot(data_analyse.GyrZmean, color='r', linewidth=2)



#%%================================ACCELEROMETER===============================

#PLOTTER accx,y,z DATA
plt.figure(6)
plt.plot(data_analyse.accx, color='r')
plt.plot(data_analyse.accy, color='b')
plt.plot(data_analyse.accz, color='g')
plt.xlabel('Samples')
plt.ylabel('Acceleration (g)')

#PLOTTER GENNEMSNIT AF AccX,Y,Z
plt.figure(7)
plt.plot(data_analyse.AccXmean, color='r', linewidth=2)
plt.plot(data_analyse.AccYmean, color='b', linewidth=2)
plt.plot(data_analyse.AccZmean, color='g', linewidth=2)
plt.title('ACCELEROMETER\n Gennemsnit af 5 smashslag for hver af de tre akser') 
plt.xlabel('Samples (1 sek)')
plt.ylabel('Acceleration (g)')
plt.grid(True)
plt.ylim([-70,70])
plt.legend(['X', 'Y', 'Z - primaer'], loc=2) 

#PLOTTER AccX og GENNEMSNIT AF AccX
plt.figure(8)  
for i in xrange(data_analyse.antalSlag):
    plt.plot(data_analyse.AccX[i], color='k')                                
plt.title('X-acceleration: x-antal slag + gns')                 
plt.xlabel('Samples (1 sek)')
plt.ylabel('Acceleration (g)')
plt.grid(True)
plt.ylim([-70,70])
plt.plot(data_analyse.AccXmean, color='r', linewidth=2)

#PLOTTER AccY og GENNEMSNIT AF AccY
plt.figure(9)  
for i in xrange(data_analyse.antalSlag):
    plt.plot(data_analyse.AccY[i], color='k')                                
plt.title('Y-acceleration: x-antal slag + gns')                 
plt.xlabel('Samples (1 sek)')
plt.ylabel('Acceleration (g)')
plt.grid(True)
plt.ylim([-70,70])
plt.plot(data_analyse.AccYmean, color='r', linewidth=2)

#PLOTTER AccZ og GENNEMSNIT AF AccZ
plt.figure(10)  
for i in xrange(data_analyse.antalSlag):
    plt.plot(data_analyse.AccZ[i], color='k')                                
plt.title('Z-acceleration: x-antal slag + gns')                 
plt.xlabel('Samples (1 sek)')
plt.ylabel('Acceleration (g)')
plt.grid(True)
plt.ylim([-70,70])
plt.plot(data_analyse.AccZmean, color='r', linewidth=2)

#%%

