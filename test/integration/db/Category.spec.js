process.env.NODE_ENV = 'test';

import mongoose from 'mongoose';
const config = require('config');
import CategoryModel from '../../../src/model/category/category';
import CategoryDbModel from '../../../server/db/models/category';
import { label, errorLog } from '../../../server/util/colors';
import chai from 'chai'; 
const expect = chai.expect;
import chaiAsPromised from 'chai-as-promised';
import dbConnect from '../../../server/db.js';

chai.use(chaiAsPromised);

dbConnect();

describe(label('DB: Category'), () => {
  let addCategory = (title) => {
    let category = new CategoryModel({title: title });
    let categoryToAdd = new CategoryDbModel({ title: category.getTitle(), code: category.getCode() });
    return categoryToAdd.save();
  };

  beforeEach(async () => {
    await CategoryDbModel.remove({}).exec();
  });

  it(label('It should throw exception when is try to add same category that is already exist'), async () => {
    try {
      await addCategory('Foo');
      return expect(addCategory('Foo')).is.rejected;
    } catch(error) {
      console.log(error);
    }
  });

  it(label('It should change title for existing category'), async () => {
    let categoryFoo = new CategoryModel({title: 'Foo' });
    let categoryBar = new CategoryModel({title: 'Bar' });
    try {
      await addCategory(categoryFoo.getTitle());
      await CategoryDbModel.changeTitle(categoryFoo, categoryBar);
      const recordFromDb = await CategoryDbModel.findOne({ code: categoryBar.getCode() });
      expect(categoryBar.getTitle()).to.equal(recordFromDb.title);
      expect(categoryBar.getCode()).to.equal(recordFromDb.code);
    } catch(error) {
      console.log(error);
    }
  });

  it(label('It should throw exception when is try to change title for category, but another category is exist with that title'),  async () => {
    try {
      let categoryFoo = new CategoryModel({title: 'Foo'});
      let categoryBar = new CategoryModel({title: 'Bar'});
      await addCategory(categoryFoo.getTitle());
      await addCategory(categoryBar.getTitle());
      return expect(CategoryDbModel.changeTitle(categoryBar, categoryFoo)).is.rejected;
    } catch(error) {
      console.log(error);
    }
  });

});