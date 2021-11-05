import os 
import mysql.connector
import requests
from bs4 import BeautifulSoup
import pandas as pd
import math

def ajustarTexto(buscar):
    textoModificado = buscar.replace(" ", "+")
    agregarTextoAlLink(textoModificado)

def agregarTextoAlLink(textoModificado):
    link = "https://wall.alphacoders.com/search.php?search=" + textoModificado
    print("Link: " + link)
    soup = beautifulSoup(link)
    numeroPaginas(soup, link)

def beautifulSoup(link):
    page = requests.get(link)
    soup = BeautifulSoup(page.content, "html.parser")
    return(soup)

def numeroPaginas(soup, link):
    filtrado1 = soup.find_all("div", "custom-nav-tabs-element")
    filtrado2 = soup.find_all("h1", "title")
    if filtrado1:
        paginas = math.ceil((int(filtrado1[0].getText().split()[0]))/29)
        print((filtrado1[0].getText().split()[0])+" "+"Imagenes en "+str(paginas)+" "+"Paginas.")
    elif filtrado2:
        paginas = math.ceil((int(filtrado2[0].getText().split()[0]))/29)
        print((filtrado2[0].getText().split()[0])+" "+"Imagenes en "+str(paginas)+" "+"Paginas.")
    nuevasConsultas(paginas, link)

def nuevasConsultas(paginas, link):
    soup = beautifulSoup(link)
    reLink = soup.find_all("div", "page_container")
    for a in range(1, paginas + 1):
        print("----------------------------------------------------------------------")
        print("Descargando Pagina " + str(a) + "...")
        newLink = str(reLink[0].attrs["data-url"])+"&page="+str(a)
        soup = beautifulSoup(newLink)
        capturarLinksImagenes(soup)
        print("Pagina " + str(a) + " Completa.")
        #print(newLink)


def capturarLinksImagenes(soup):
    filtrado1 = soup.find_all("div", "boxgrid")
    listaLinksImagenes = list()
    for a in filtrado1:
        filtrado2 = a.find_all("a")
        for b in filtrado2:
            listaLinksImagenes.append("https://wall.alphacoders.com/"+b.attrs["href"])
    #print(len(listaLinksImagenes))
    capturarImagenes(listaLinksImagenes)

def capturarImagenes(listaLinksImagenes):
    listaFullImagenes = list()
    listaTags = list()
    for a in listaLinksImagenes:
        soup = beautifulSoup(a)
        filtrado1 = soup.find_all("div", "img-container-desktop")
        capturarTags(soup, listaTags)
        for b in filtrado1:
            filtrado2 = b.find_all("a")
            for c in filtrado2:
                listaFullImagenes.append(c.attrs["href"])
    ingresarBaseDeDatos(listaTags, listaFullImagenes)
    guardarImagen(listaFullImagenes)
    print(str(len(listaFullImagenes))+" imagenes")
    #print(len(listaTags))

def capturarTags(soup, listaTags):
    filtrado1 = soup.find_all("div", "tags-container")
    for a in filtrado1:
        filtrado2 = a.find_all("div", "tag-element")
        tags = ""
        for b in filtrado2:
            reTag = b.getText()
            reReTag = reTag.replace("\n", " ")
            tags = tags + reReTag.strip() + ","
        listaTags.append(tags)

def guardarImagen(listaFullImagenes):
    for a in listaFullImagenes:
        page = requests.get(a)
        f_ext = os.path.splitext(a)[-1]
        ruta = "images/" + a.replace(':', '').replace('/', '').format(f_ext)
        with open(ruta, 'wb') as f:
            f.write(page.content)
        ruta = "images/resizes/" + a.replace(':', '').replace('/', '').format(f_ext)
        with open(ruta, 'wb') as g:
            g.write(page.content)

def ingresarBaseDeDatos(listaTags, listaFullImagenes):
    a = 0
    while a < len(listaTags):
        f_ext = os.path.splitext(listaFullImagenes[a])[-1]
        urlImagen = "images/" + listaFullImagenes[a].replace(':', '').replace('/', '').format(f_ext)
        tagsImagen = listaTags[a]
        #print(listaTags)
        conexion1=mysql.connector.connect(  
            host="localhost", 
            user="root", 
            passwd="", 
            database="ingresar_foto")
        cursor1=conexion1.cursor()
        sql="insert into imagenes(tags, imagen, resize) values (%s,%s,%s)"
        datos=(tagsImagen,urlImagen,urlImagen)
        cursor1.execute(sql, datos)
        conexion1.commit()
        conexion1.close()
        a += 1