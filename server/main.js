import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import { Employees } from '../imports/collections/employees';
import { image, helpers } from 'faker';

Meteor.startup(() => {

  // this line should run only once when the database is empty
  const numberRecords = Employees.find({}).count();
  console.log(numberRecords);
  if(!numberRecords){
    _.times(5000, () => {
      const { name, email, phone } = helpers.createCard();

      Employees.insert({
        name,email,phone,
        avatar: image.avatar()
      })
    });
  }

  Meteor.publish('employees',function(per_page){
    return Employees.find({}, {limit:per_page });
  })

});
