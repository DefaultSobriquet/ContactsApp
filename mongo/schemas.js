import mongoose from 'mongoose';

// See https://mongoosejs.com/docs/guide.html#definition

const { Schema, model } = mongoose;

const staffSchema = new Schema({
    name: String,
    pronouns: String,
    section: String,
    position: String,
    phone: {
        type: String,
        validate: {
            validator: function(v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    }
});

// Build the Staff model
const Staff = model('Staff', staffSchema);

export {Staff}
export default {Staff}