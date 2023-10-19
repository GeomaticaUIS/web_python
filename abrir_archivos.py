import json
import os
import subprocess

# Cargar la ruta de la carpeta desde el archivo JSON
with open('metadato.json', 'r', encoding="utf8") as json_file:
    data = json.load(json_file)[0]  
    ruta_carpeta = data.get('ruta_ejemplo')
if ruta_carpeta:
    # Verificar si la ruta de la carpeta existe
    if os.path.exists(ruta_carpeta) and os.path.isdir(ruta_carpeta):
        # Abrir el explorador de archivos en la carpeta especificada
        if os.name == 'nt':
            # En Windows, usa el comando "explorer"
            subprocess.Popen(['explorer', ruta_carpeta], shell=True)
        elif os.name == 'posix':
            # En sistemas Unix (Linux, macOS), usa el comando "nautilus" (puede variar en función del entorno gráfico)
            subprocess.Popen(['nautilus', ruta_carpeta])
    else:
        print('La carpeta especificada en el JSON no existe.')
else:
    print('No se encontró la ruta de la carpeta en el JSON.')
 
 
