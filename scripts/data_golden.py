# -*- coding: utf-8 -*-
"""
Created on Fri Jun 17 18:59:29 2016

@author: Marc
"""

import numpy as np

GoldenStandard = np.genfromtxt('Philip/Dec/Dec_philip_smash_fp18_1.txt')

#%%
defVibration = 35                       #forskellen mellem to på hinanden følgende sampleværdier - defineret vibration    <<<<<--- vigtig
antalSamples = 500                      #500 samples = 1 sek
antalSamplesBagud = antalSamples + 2    #antal samples bagud fra fundet vibration
jump = 750                              #springe 750 samples (1,5 sek) frem for at finde næste vibration                  <<<<<--- vigtig
start = 0                               #bestemmer hvor (i) skal starte
slagStart = []                          #antalSamples + antalSamplesBagud før defineret vibration == start på svingsløjfe
findSlag = 20                           #forsøger at finde x-antal slag                                                   <<<<<--- VIGTIG
antalSlag = 4                           #finder de 4 første slag

for j in xrange(findSlag):              #anvend findSlag eller antalSlag                                                  <<<<<--- VIGTIG
    for i in xrange(start, len(GoldenStandard[:,1])):
        if abs(GoldenStandard[:,1][i]-GoldenStandard[:,1][i-1]) >= defVibration:
            i = i - antalSamplesBagud
            start = i+jump
            slagStart.append(i)
            antalSlag = slagStart.index(i)+1
            break
        
#%%
#Offset for gyro og accelerometer
offsetGyrX = 463        #Gyr X
offsetGyrY = 462        #Gyr Y
offsetGyrZ = 466        #Gyr Z
offsetAccX = 511        #Acc X
offsetAccY = 512        #Acc Y
offsetAccZ = 516        #Acc Z

#gyr = vinkelhastigheder og acc = accelerationer, begge ganget op således at
#de giver vinkelhastigheder (grader/s) og acceleartioner (g)
gyrxGolden = np.floor((GoldenStandard[:,0]-offsetGyrX)*19.0)
gyryGolden = np.floor((GoldenStandard[:,1]-offsetGyrY)*18.5)
gyrzGolden = np.floor((GoldenStandard[:,2]-offsetGyrZ)*18.5)
accxGolden = np.floor((GoldenStandard[:,3]-offsetAccX)*400/1024)
accyGolden = np.floor((GoldenStandard[:,4]-offsetAccY)*400/1024)
acczGolden = np.floor((GoldenStandard[:,5]-offsetAccZ)*400/1024)

GyrXGolden = []
GyrYGolden = []
GyrZGolden = []
AccXGolden = []
AccYGolden = []
AccZGolden = []

#inddeler slagene i sekvenser
for i in xrange(antalSlag):  
    GyrXGolden.append(gyrxGolden[slagStart[i]:slagStart[i]+antalSamples])    
    GyrYGolden.append(gyryGolden[slagStart[i]:slagStart[i]+antalSamples])
    GyrZGolden.append(gyrzGolden[slagStart[i]:slagStart[i]+antalSamples])
    AccXGolden.append(accxGolden[slagStart[i]:slagStart[i]+antalSamples])
    AccYGolden.append(accyGolden[slagStart[i]:slagStart[i]+antalSamples])
    AccZGolden.append(acczGolden[slagStart[i]:slagStart[i]+antalSamples])
    
#vender sekvenser, hvis de er negative, så træfpunkt er positivt    
for i in xrange(antalSlag):
    if GyrYGolden[i][499] < 0:
#        print('Slaget er negativt - vendt til positiv')
        GyrXGolden[i] = GyrXGolden[i]        
        GyrYGolden[i] = GyrYGolden[i] * -1
        GyrZGolden[i] = GyrZGolden[i] * -1
        AccXGolden[i] = AccXGolden[i]
        AccYGolden[i] = AccYGolden[i] * -1
        AccZGolden[i] = AccZGolden[i] * -1
    else: 
#        print ('Slaget er positivt')
        GyrXGolden[i] = GyrXGolden[i]        
        GyrYGolden[i] = GyrYGolden[i]
        GyrZGolden[i] = GyrZGolden[i]
        AccXGolden[i] = AccXGolden[i]
        AccYGolden[i] = AccYGolden[i]
        AccZGolden[i] = AccZGolden[i]
        
GyrXtotalGolden = 0
for i in xrange(antalSlag):
    GyrXtotalGolden = GyrXtotalGolden + GyrXGolden[i]
GyrXmeanGolden = GyrXtotalGolden/antalSlag

GyrYtotalGolden = 0
for i in xrange(antalSlag):
    GyrYtotalGolden = GyrYtotalGolden + GyrYGolden[i]
GyrYmeanGolden = GyrYtotalGolden/antalSlag

GyrZtotalGolden = 0
for i in xrange(antalSlag):
    GyrZtotalGolden = GyrZtotalGolden + GyrZGolden[i]
GyrZmeanGolden = GyrZtotalGolden/antalSlag

AccXtotalGolden = 0
for i in xrange(antalSlag):
    AccXtotalGolden = AccXtotalGolden + AccXGolden[i]
AccXmeanGolden = AccXtotalGolden/antalSlag

AccYtotalGolden = 0
for i in xrange(antalSlag):
    AccYtotalGolden = AccYtotalGolden + AccYGolden[i]
AccYmeanGolden = AccYtotalGolden/antalSlag

AccZtotalGolden = 0
for i in xrange(antalSlag):
    AccZtotalGolden = AccZtotalGolden + AccZGolden[i]
AccZmeanGolden = AccZtotalGolden/antalSlag

#%%
#KONSTANTER
hz = 500.                           #optagefrekvens
niveau = 0                          #krydsning af x-aksen
rad = 0.0174532925                  #0.0174532925 rad = 1 grad
e = 0.7                             #restitutionskoefficienten
fjerbold = 0.005                    #fjerboldens vægt (5 gram)
fjerboldhastighed = -3              #fjerboldens indkommende hastighed m/s
afstand = 0.5                       #afstanden i meter fra omdrejningspunktet på håndtaget // kan ændres afhængig af træfpunkt
inertimoment = 0.0085               #ketsjers inertimoment (kg*m^2)                  
masse = inertimoment/afstand**2     #ketsjerens effektive masse i gram i træføjeblikket 

#VARIABLER
vinkelhastighedGolden = []
vinkelaccelerationGolden = []
impulsmomentGolden = []
lineaerhastighedGolden = []
impulsGolden = []
udgangshastighedGolden = []

for j in xrange(antalSlag):
    for i,v in enumerate(reversed(GyrYGolden[j])):
        if v < niveau:
            point1 = v                                                                  #værdien for første sample v < niveau // kan måske underværes
            point2 = GyrYGolden[j][antalSamples-1]                                      #sidste sample inden er opstår vibrationer 
            point3 = antalSamples-1-i                                                   #indeksnummer for  første værdi v < niveau
            point4 = antalSamples-1                                                     #indeksnummer for sidste sample           
            vinkelhastighedGolden.append(np.sqrt(GyrXGolden[j][antalSamples-1]**2+      #vinklehastighed (deg/s)
                GyrYGolden[j][antalSamples-1]**2+GyrZGolden[j][antalSamples-1]**2))            
            vinkelaccelerationGolden.append((point2-point1)/((point4-point3)/hz))       #vinkelacceleration (deg/s^2)
            impulsmomentGolden.append(vinkelhastighedGolden[j]*rad*inertimoment)        #impulsmoment ((kg*m^2)/s)
            lineaerhastighedGolden.append((vinkelhastighedGolden[j]*rad*afstand)+       #lineær hastighed (m/s)
                (np.sqrt(AccXGolden[j][antalSamples-1]**2+AccYGolden[j][antalSamples-1]**2+
                AccZGolden[j][antalSamples-1]**2)/hz))
            impulsGolden.append(lineaerhastighedGolden[j]*masse)                        #lineær impuls ((kg*m)/s)       
            udgangshastighedGolden.append(((1+e)/(masse+fjerbold)*impulsGolden[j])+
                ((fjerbold-e*masse)/(masse+fjerbold))*fjerboldhastighed)                #udgangshastighed (m/s)
            break                                                                       #break skal være sat til

vinkelhastighedmeanGolden = np.mean(vinkelhastighedGolden)                                          
vinkelhastighedstdGolden = np.std(vinkelhastighedGolden)                                        

vinkelaccelerationmeanGolden = np.mean(vinkelaccelerationGolden)                                
vinkelaccelerationstdGolden = np.std(vinkelaccelerationGolden)                                    

impulsmomentmeanGolden = np.mean(impulsmomentGolden)                                            
impulsmomentstdGolden = np.std(impulsmomentGolden)                                                 

lineaerhastighedmeanGolden = np.mean(lineaerhastighedGolden)
lineaerhastighedstdGolden = np.std(lineaerhastighedGolden)

impulsmeanGolden = np.mean(impulsGolden)
impulsstdGolden = np.mean(impulsGolden)

udgangshastighedmeanGolden = np.mean(udgangshastighedGolden)
udgangshastighedstdGolden = np.std(udgangshastighedGolden)
udgangshastighedkphGolden = np.mean(udgangshastighedGolden)*3.6

#%%==================================PRINTs=====================================
print '-----------DEN GYLDNE STANDARD-----------'
print 'Antal fundne slag: %d' %(antalSlag)
print 'Gns vinkelhastighed (grad/s)', ("%.1f") %vinkelhastighedmeanGolden,', std', ("%.1f") %vinkelhastighedstdGolden
print 'Gns vinkelacceleration (grad/s^2)', ("%.f") %vinkelaccelerationmeanGolden,', std', ("%.f") %vinkelaccelerationstdGolden
print 'Gns impulsmoment ((kg*m^2)/s)', ("%.2f") %impulsmomentmeanGolden,', std', ("%.2f") %impulsmomentstdGolden
print 'Gns lineær hastighed (m/s)', ("%.1f") %lineaerhastighedmeanGolden, ', std', ("%.1f") %lineaerhastighedstdGolden
print 'Gns lineær impuls (kg*m^2)', ("%.1f") %impulsmeanGolden,', std', ("%.1f") %impulsstdGolden
print 'Gns udganghastighed (ms/s)', ("%.1f") %udgangshastighedmeanGolden,', std', ("%.1f") %udgangshastighedstdGolden,', (km/t)', ("%.1f") %udgangshastighedkphGolden


#%%==================================PLOTS=====================================
