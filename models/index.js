var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/tripplanner');
// var marked = require('marked');

var Place = db.define('place', {
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    location: {
        type: Sequelize.ARRAY(Sequelize.FLOAT),
        allowNull: false
    }
});

var Hotel = db.define('hotel', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    num_stars: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          min: 1,
          max: 5
        }
    },
    amenities: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, {
    defaultScope: {
      include: [Place]
    },
});

var Activity = db.define('activity', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age_range: {
        type: Sequelize.STRING,
        allowNull: false
    },


}, {
    getterMethods: {
      type: function() {
        return 'activity';
      }
    },
    defaultScope: {
      include: [Place]
    },
});

var Restaurant = db.define('restaurant', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cuisine: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
}, {
    defaultScope: {
      include: [Place]
    },
});

Hotel.belongsTo(Place);
Activity.belongsTo(Place);
Restaurant.belongsTo(Place);

module.exports = {
    Place: Place,
    Hotel: Hotel,
    Activity: Activity,
    Restaurant: Restaurant,
    db: db,
};
