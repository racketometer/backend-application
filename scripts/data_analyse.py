# -*- coding: utf-8 -*-
"""
Created on Fri Jun 17 12:16:44 2016

@author: Marc
"""

import numpy as np
import sys
import json

def main(argv):
    argLength = len(sys.argv)
    if argLength == 2:
        mode = 'print'
        print 'Mode    : ', str(mode)
    elif argLength == 3:
        mode = sys.argv[2]
    else:
        sys.exit('Wrong number of arguments. Specify file and optionally mode\nExample:\n  python script.py [123,456] raw')

    file = sys.argv[1]

    SmashTest = np.genfromtxt(file) #fp1_1-4 er begynder // fp18_1-4 er elitespille

    #%% SPAM :)
    #SmashTest = np.genfromtxt('kaare/dec_kaare_forhaand_clear.txt')
    #SmashTest = np.genfromtxt('Philip/Dec/Dec_philip_forhaand_clear.txt')
    #SmashTest = np.genfromtxt('Primdahl/Dec/Dec_Primdahl_clear.txt')

    #%% definition af konstanter og start på svingsløjfe
    defVibration = 35                       #forskellen mellem to på hinanden følgende sampleværdier - defineret vibration    <<<<<--- vigtig
    antalSamples = 500                      #500 samples = 1 sek
    antalSamplesBagud = antalSamples + 2    #antal samples bagud fra fundet vibration
    jump = 750                              #springe 750 samples (1,5 sek) frem for at finde næste vibration                  <<<<<--- vigtig
    start = 0                               #bestemmer hvor (i) skal starte
    slagStart = []                          #antalSamples + antalSamplesBagud før defineret vibration == start på svingsløjfe
    findSlag = 20                           #forsøger at finde x-antal slag                                                   <<<<<--- VIGTIG
    antalSlag = 4                           #finder de 4 første slag

    for j in xrange(findSlag):              #anvend findSlag eller antalSlag                                                  <<<<<--- VIGTIG
        for i in xrange(start, len(SmashTest[:,1])):
            if abs(SmashTest[:,1][i]-SmashTest[:,1][i-1]) >= defVibration:
                i = i - antalSamplesBagud
                start = i+jump
                slagStart.append(i)
                antalSlag = slagStart.index(i)+1
                break

    #%%
    #Beregnet offset for hhv. gyro og accelerometer
    offsetGyrX = 463        #Gyr X
    offsetGyrY = 462        #Gyr Y
    offsetGyrZ = 466        #Gyr Z
    offsetAccX = 511        #Acc X
    offsetAccY = 512        #Acc Y
    offsetAccZ = 516        #Acc Z

    #gyr = vinkelhastigheder og acc = accelerationer, begge ganget op således at
    #de giver hhv. vinkelhastigheder (grader/s) og acceleartioner (g)
    gyrx = np.floor((SmashTest[:,0]-offsetGyrX)*19.0)
    gyry = np.floor((SmashTest[:,1]-offsetGyrY)*18.5)
    gyrz = np.floor((SmashTest[:,2]-offsetGyrZ)*18.5)
    accx = np.floor((SmashTest[:,3]-offsetAccX)*400/1024)       #mangler valideringstest for accelerometer
    accy = np.floor((SmashTest[:,4]-offsetAccY)*400/1024)       #mangler valideringstest for accelerometer
    accz = np.floor((SmashTest[:,5]-offsetAccZ)*400/1024)       #mangler valideringstest for accelerometer

    GyrX = []
    GyrY = []
    GyrZ = []
    AccX = []
    AccY = []
    AccZ = []

    #inddeler slagene i sekvenser
    for i in xrange(antalSlag):
        GyrX.append(gyrx[slagStart[i]:slagStart[i]+antalSamples])
        GyrY.append(gyry[slagStart[i]:slagStart[i]+antalSamples])
        GyrZ.append(gyrz[slagStart[i]:slagStart[i]+antalSamples])
        AccX.append(accx[slagStart[i]:slagStart[i]+antalSamples])
        AccY.append(accy[slagStart[i]:slagStart[i]+antalSamples])
        AccZ.append(accz[slagStart[i]:slagStart[i]+antalSamples])

    #vender sekvenser, hvis de er negative, så træfpunkt er positivt
    for i in xrange(antalSlag):
        if GyrY[i][499] < 0:
    #        print('Slaget er negativt - vendt til positiv')
            GyrX[i] = GyrX[i]
            GyrY[i] = GyrY[i] * -1
            GyrZ[i] = GyrZ[i] * -1
            AccX[i] = AccX[i]
            AccY[i] = AccY[i] * -1
            AccZ[i] = AccZ[i] * -1
        else:
    #        print ('Slaget er positivt')
            GyrX[i] = GyrX[i]
            GyrY[i] = GyrY[i]
            GyrZ[i] = GyrZ[i]
            AccX[i] = AccX[i]
            AccY[i] = AccY[i]
            AccZ[i] = AccZ[i]

    GyrXtotal = 0
    for i in xrange(antalSlag):
        GyrXtotal = GyrXtotal + GyrX[i]
    GyrXmean = GyrXtotal/antalSlag

    GyrYtotal = 0
    for i in xrange(antalSlag):
        GyrYtotal = GyrYtotal + GyrY[i]
    GyrYmean = GyrYtotal/antalSlag

    GyrZtotal = 0
    for i in xrange(antalSlag):
        GyrZtotal = GyrZtotal + GyrZ[i]
    GyrZmean = GyrZtotal/antalSlag

    AccXtotal = 0
    for i in xrange(antalSlag):
        AccXtotal = AccXtotal + AccX[i]
    AccXmean = AccXtotal/antalSlag

    AccYtotal = 0
    for i in xrange(antalSlag):
        AccYtotal = AccYtotal + AccY[i]
    AccYmean = AccYtotal/antalSlag

    AccZtotal = 0
    for i in xrange(antalSlag):
        AccZtotal = AccZtotal + AccZ[i]
    AccZmean = AccZtotal/antalSlag

    #%%
    #KONSTANTER - bruges til beregning af variabler
    hz = 500.                           #optagefrekvens
    niveau = 0                          #krydsning af x-aksen
    rad = 0.0174532925                  #0.0174532925 rad = 1 grad
    e = 0.7                             #restitutionskoefficienten mellem fjerbold og ketcherens streng
    fjerbold = 0.005                    #fjerboldens vægt (5 gram)
    fjerboldhastighed = -3              #fjerboldens indkommende hastighed m/s
    afstand = 0.5                       #afstanden i meter fra omdrejningspunktet på håndtaget // kan ændres afhængig af træfpunkt
    inertimoment = 0.0085               #ketsjers inertimoment (kg*m^2)   -----VIGTIG-----  skal ændres ved brug af anden/andre ketchere
    masse = inertimoment/afstand**2     #ketsjerens effektive masse i gram i træføjeblikket


    #VARIABLER - bruges til definition af pop-termer
    vinkelhastighed = []        #ketcherføring
    vinkelacceleration = []     #ketcherføring
    impulsmoment = []           #ketcherføring
    lineaerhastighed = []       #ketcherføring
    impuls = []                 #ketcherføring
    udgangshastighed = []       #power

    for j in xrange(antalSlag):
        for i,v in enumerate(reversed(GyrY[j])):
            if v < niveau:
                point1 = v                                                              #værdien for første sample v < niveau // kan måske underværes
                point2 = GyrY[j][antalSamples-1]                                        #sidste sample inden der opstår vibrationer
                point3 = antalSamples-1-i                                               #indeksnummer for  første værdi v < niveau
                point4 = antalSamples-1                                                 #indeksnummer for sidste sample
                vinkelhastighed.append(np.sqrt(GyrX[j][antalSamples-1]**2+              #vinklehastighed (deg/s)
                    GyrY[j][antalSamples-1]**2+GyrZ[j][antalSamples-1]**2))
                vinkelacceleration.append((point2-point1)/((point4-point3)/hz))         #vinkelacceleration (deg/s^2)
                impulsmoment.append(vinkelhastighed[j]*rad*inertimoment)                #impulsmoment ((kg*m^2)/s)
                lineaerhastighed.append((vinkelhastighed[j]*rad*afstand)+(np.sqrt(      #lineær hastighed (m/s)
                    AccX[j][antalSamples-1]**2+AccY[j][antalSamples-1]**2+
                    AccZ[j][antalSamples-1]**2)/hz))
                impuls.append(lineaerhastighed[j]*masse)                                #lineær impuls ((kg*m)/s)
                udgangshastighed.append(((1+e)/(masse+fjerbold)*impuls[j])+((fjerbold-e*masse)/(masse+fjerbold))*fjerboldhastighed)            #udgangshastighed (m/s)
                break

    vinkelhastighedmean = np.mean(vinkelhastighed)
    vinkelhastighedstd = np.std(vinkelhastighed)

    vinkelaccelerationmean = np.mean(vinkelacceleration)
    vinkelaccelerationstd = np.std(vinkelacceleration)

    impulsmomentmean = np.mean(impulsmoment)
    impulsmomentstd = np.std(impulsmoment)

    lineaerhastighedmean = np.mean(lineaerhastighed)
    lineaerhastighedstd = np.std(lineaerhastighed)

    impulsmean = np.mean(impuls)
    impulsstd = np.mean(impuls)

    udgangshastighedmean = np.mean(udgangshastighed)
    udgangshastighedstd = np.std(udgangshastighed)
    udgangshastighedkph = np.mean(udgangshastighed)*3.6

    if mode == 'raw':
        print json.dumps({
            'strokes': antalSlag,
            'angular': {
                'speed': vinkelhastighedmean,
                'acceleration': vinkelaccelerationmean
            },
            'impuls': impulsmomentmean,
            'linear': {
                'speed': lineaerhastighedmean,
                'impulse': impulsmean
            },
            'shuttlecock': {
                'speed': udgangshastighedmean
            },
            'version': '1.0'
        })
    else:
        #%%==================================PRINTs=====================================
        print '-----------DIN SVINGSLØJFE ANALYSE-----------'
        print 'Antal fundne slag: %d' %(antalSlag)
        print 'Gns vinkelhastighed (grad/s)', ("%.1f") %vinkelhastighedmean,', std', ("%.1f") %vinkelhastighedstd
        print 'Gns vinkelacceleration (grad/s^2)', ("%.f") %vinkelaccelerationmean,', std', ("%.f") %vinkelaccelerationstd
        print 'Gns impulsmoment ((kg*m^2)/s)', ("%.2f") %impulsmomentmean,', std', ("%.2f") %impulsmomentstd
        print 'Gns lineær hastighed (m/s)', ("%.1f") %lineaerhastighedmean, ', std', ("%.1f") %lineaerhastighedstd
        print 'Gns lineær impuls (kg*m^2)', ("%.1f") %impulsmean,', std', ("%.1f") %impulsstd
        print 'Gns udganghastighed (ms/s)', ("%.1f") %udgangshastighedmean,', std', ("%.1f") %udgangshastighedstd,', (km/t)', ("%.1f") %udgangshastighedkph
        #%%============================================================================

if __name__ == '__main__':
    main(sys.argv[1:])