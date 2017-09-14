const stripe = require('stripe')('sk_test_pVGkF03rLEY4ZYketkrKUDoR');
const winston = require('winston');


function addSubscription(customerId) {
  return new Promise((resolve, reject) => {
    stripe.subscriptions.create({
      customer: customerId,
      plan: 'sc-free-plan',
    }, (err, subscription) => {
      if (err) { return reject(err); }
      return resolve(subscription);
    });
  });
}

function addCustomer({ email }) {
  return new Promise((resolve, reject) => {
    stripe.customers.create({
      email,
    }, (createCustomerErr, customer) => {
      if (createCustomerErr) { return reject(createCustomerErr); }
      return addSubscription(customer.id).then((subscription) => {
        winston.error(subscription);
        return resolve({
          stripeCustomerId: customer.id,
        });
      })
      .catch((addSubscriptionErr) => {
        return reject(addSubscriptionErr);
      });
    });
  });
}

module.exports = { addCustomer };
