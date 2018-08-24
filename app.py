import os

import pandas as pd
import numpy as np
import json
from pprint import pprint

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import inspect
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template, redirect
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data/chidata.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(db.engine, reflect=True)
inspector = inspect(db.engine)
print(inspector.get_table_names())

# Save references to each table
building_permits = Base.classes.building_permits
demo_2010 = Base.classes.demo_2010
demo_2011 = Base.classes.demo_2011
demo_2012 = Base.classes.demo_2012
demo_2013 = Base.classes.demo_2013
demo_2014 = Base.classes.demo_2014
demo_2015 = Base.classes.demo_2015
demo_2016 = Base.classes.demo_2016

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


@app.route("/building_permits/<year>")
def building_permit(year):
    """This endpoint returns a json of building permit data for the year chosen."""
    #Generate the table query statement with FlaskSQLAlchemy
    stmt = db.session.query(building_permits)\
    .filter(building_permits.ISSUE_DATE.like(f'%{year}')).statement
    print(stmt)
    #print(stmt)
    list_of_json = []
    # Use Pandas to perform the sql query
    df = pd.read_sql_query(stmt, db.session.bind)
    i = 0
    for index, row in df.iterrows():
        rowdict = row.to_dict()
        list_of_json.append(rowdict)
    #pprint(list_of_json)
    # Use json.dumps() to create an array of JS objects
    json_array = json.dumps(list_of_json)
    return json_array

# @app.route("/samples/<sample>")
# def samples(sample):
#     """Return `otu_ids`, `otu_labels`,and `sample_values`."""
#     stmt = db.session.query(Samples).statement
#     df = pd.read_sql_query(stmt, db.session.bind)

#     # Filter the data based on the sample number and
#     # only keep rows with values above 1
#     sample_data = df.loc[df[sample] > 1, ["otu_id", "otu_label", sample]]
#     # Format the data to send as json
#     data = {
#         "otu_ids": sample_data.otu_id.values.tolist(),
#         "sample_values": sample_data[sample].values.tolist(),
#         "otu_labels": sample_data.otu_label.tolist(),
#     }
#     return jsonify(data)

@app.route("/tifdata")
def tifdata():
    '''This endpont returns a geoJSON from a local directory for leaflet mapping.'''
    return app.send_static_file('./geoJSON/tifProjects.geojson')

@app.route("/tif_boundaries")
def tifboundary():
    '''This endpont returns a geoJSON from a local directory for leaflet mapping.'''
    return app.send_static_file('./geoJSON/tif_boundaries.geojson')

if __name__ == "__main__":
    app.run(debug=True)