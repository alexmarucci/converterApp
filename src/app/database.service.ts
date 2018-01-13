import { Injectable } from '@angular/core';

import * as Datastore from 'nedb'
import * as Promise from 'bluebird';
import * as path from 'path';
import {ElectronService} from 'ngx-electron';

@Injectable()
export class DatabaseService {
    db: Datastore;

  constructor(private electronService: ElectronService) {
      let path: String = './DB_Y.db';
      if (this.electronService.isElectronApp) {
          path = this.electronService.remote.app.getPath('userData') + '/DB_Y.db';
      }
      this.db = new Datastore({
          autoload: true,
          filename: path
          });
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
    update(video) {
        return new Promise((resolve, reject) => {
            return this.db.update({ id: video.id }, video,{upsert: true}, ((err, numReplaced) => {
                if ( err )
                {
                    reject(err);
                }
                else
                {
                    resolve(numReplaced);
                }
            }));
        })
    }
}
