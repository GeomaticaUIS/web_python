from flask import Flask, render_template, send_from_directory,request, redirect, url_for,send_file
import os
import subprocess

app = Flask(__name__,
        template_folder='templates')

app.static_folder = 'static'

import json


# Lee los datos desde el archivo JSON
with open('./static/metadato.json', 'r', encoding="utf8") as json_file:
    data = json.load(json_file)

# Agrega un índice a cada elemento en la lista
for index, item in enumerate(data):
    item['index'] = index


@app.route('/static/')
def static_files(filename):
    return send_from_directory('static', filename)

@app.route('/static/metadato.json')
def get_metadato():
    return send_file('static/metadato.json')

@app.route('/')
def index():
    # Aquí cargas tu archivo JSON y lo pasas a la plantilla HTML data = metadato.json()
    return render_template('index.html', data=data)

@app.route('/abrir-explorador/<int:index>')
def abrir_explorador(index):
    # Obtén la ruta_ejemplo del diccionario correspondiente al índice
    ruta_ejemplo = data[index]['RUTA_HTML']
    
    # Abre el explorador de archivos en la ruta_ejemplo
    subprocess.Popen(['explorer', ruta_ejemplo], shell=True)
    
    return redirect(url_for('index'))

@app.route('/descargar', methods=['GET'])
def descargar_archivo():
    # Obtén los parámetros de la solicitud GET
    carpeta = request.args.get('carpeta')
    archivo = request.args.get('archivo')

    # Construye la ruta completa al archivo en el servidor
    ruta_completa = f"{carpeta}/{archivo}" # Ajusta la estructura de tu carpeta base

    try:
        # Usa send_file para enviar el archivo al cliente
        return send_file(ruta_completa, as_attachment=True)
    except Exception as e:
        # Maneja cualquier error que pueda ocurrir durante la descarga
        return str(e)

if __name__ == '__main__':
    app.run(debug=True)
