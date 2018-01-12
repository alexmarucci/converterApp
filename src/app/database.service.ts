import { Injectable } from '@angular/core';

import * as Datastore from 'nedb'
import * as Promise from 'bluebird';

@Injectable()
export class DatabaseService {
    db: Datastore;

  constructor() {
      this.db = new Datastore({
          filename: 'DB_Y.db',
          autoload: true });
  }

  insert(item){
    return new Promise((resolve, reject) => {
        return this.db.insert(item, ((err, newItem) => {
            if ( err ){
                reject(err);
            } else {
                resolve(newItem);
            }
        }))
    });
  }
   findAll() {
        return new Promise((resolve, reject) => {
            return this.db.find({}, ((err, items) => {
                if ( err )
                {
                    reject(err);
                }
                else
                {
                    resolve(items);
                }
            }));
        })
    }

    remove(id) {
        return new Promise((resolve, reject) => {
            return this.db.remove({ id: id }, {}, ((err, numRemoved) => {
                if ( err )
                {
                    reject(err);
                }
                else
                {
                    resolve(numRemoved);
                }
            }));
        })
    }

}
