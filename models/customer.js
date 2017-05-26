module.exports = function(sequelize, DataTypes) {
    var customer = sequelize.define('customer', {
        customer_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        classMethods: {
            associate: function(models) {
                customer.hasMany(models.burger);
            }
        }
    });
    return customer;
}
