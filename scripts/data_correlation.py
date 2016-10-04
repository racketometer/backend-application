# -*- coding: utf-8 -*-
"""
Created on Mon Jun 20 13:57:11 2016

@author: Marc
"""

import data_analyse
import data_golden

import numpy as np
import matplotlib.pyplot as plt

argLength = len(sys.argv)
if argLength == 2:
    mode = 'print'
    print 'Use file: ', str(sys.argv[1])
    print 'Mode    : ', str(mode)
elif argLength == 3:
    mode = sys.argv[2]
else:
    sys.exit('Cor: Wrong number of arguments. Specify file and optionally mode\nExample:\n  python script.py data.txt raw')

file = sys.argv[1]
data_analyse.init(sys.argv)

plt.close("all")

#%%=================================PRINTs=====================================
print '-----------KORRELATIONS ANALYSE-----------'
print 'X', np.corrcoef(data_analyse.GyrXmean, data_golden.GyrXmeanGolden)
print 'Y', np.corrcoef(data_analyse.GyrYmean, data_golden.GyrYmeanGolden)
print 'Z', np.corrcoef(data_analyse.GyrZmean, data_golden.GyrZmeanGolden)

#%%=================================PLOTS======================================



#%%================================GYRO========================================
plt.figure(1)
plt.plot(data_golden.GyrXmeanGolden, color='b')
plt.plot(data_analyse.GyrXmean, color='r')
plt.title('Gyro X\n Sammenligning mellem dit slag og DEN GYLDNE STANDARD')
plt.xlabel('Samples (1 sek)')
plt.ylabel('Vinkelhastighed (grad/sek)')
plt.grid(True)
plt.ylim([-2500,6000])
plt.legend(['DEN GYLDNE STANDARD', 'Din vinkelhastighed'], loc=2)

plt.figure(2)
plt.plot(data_golden.GyrYmeanGolden, color='b')
plt.plot(data_analyse.GyrYmean, color='r')
plt.title('Gyro Y\n Sammenligning mellem dit slag og DEN GYLDNE STANDARD')
plt.xlabel('Samples (1 sek)')
plt.ylabel('Vinkelhastighed (grad/sek)')
plt.grid(True)
plt.ylim([-2500,6000])
plt.legend(['DEN GYLDNE STANDARD', 'Din vinkelhastighed'], loc=2)

plt.figure(3)
plt.plot(data_golden.GyrZmeanGolden, color='b')
plt.plot(data_analyse.GyrZmean, color='r')
plt.title('Gyro Z\n Sammenligning mellem dit slag og DEN GYLDNE STANDARD')
plt.xlabel('Samples (1 sek)')
plt.ylabel('Vinkelhastighed (grad/sek)')
plt.grid(True)
plt.ylim([-2500,6000])
plt.legend(['DEN GYLDNE STANDARD', 'Din vinkelhastighed'], loc=2)


#%%================================ACCELEROMETER===============================
plt.figure(4)
plt.plot(data_golden.AccXmeanGolden, color='b')
plt.plot(data_analyse.AccXmean, color='r')
plt.title('Accel X\n Sammenligning mellem dit slag og DEN GYLDNE STANDARD')
plt.xlabel('Samples (1 sek)')
plt.ylabel('Acceleration (G)')
plt.grid(True)
plt.ylim([-70,70])
plt.legend(['DEN GYLDNE STANDARD', 'Din vinkelhastighed'], loc=2)

plt.figure(5)
plt.plot(data_golden.AccYmeanGolden, color='b')
plt.plot(data_analyse.AccYmean, color='r')
plt.title('Accel Y\n Sammenligning mellem dit slag og DEN GYLDNE STANDARD')
plt.xlabel('Samples (1 sek)')
plt.ylabel('Acceleration (G)')
plt.grid(True)
plt.ylim([-70,70])
plt.legend(['DEN GYLDNE STANDARD', 'Din vinkelhastighed'], loc=2)

plt.figure(6)
plt.plot(data_golden.AccZmeanGolden, color='b')
plt.plot(data_analyse.AccZmean, color='r')
plt.title('Accel Z\n Sammenligning mellem dit slag og DEN GYLDNE STANDARD')
plt.xlabel('Samples (1 sek)')
plt.ylabel('Acceleration (G)')
plt.grid(True)
plt.ylim([-70,70])
plt.legend(['DEN GYLDNE STANDARD', 'Din vinkelhastighed'], loc=2)