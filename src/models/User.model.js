import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    profileType: { type: String },
    //socialMeadiaCreator, student, professional,freelancer, artist, brand, other,
    category: { type: String },
    // [
    //     {
    //         "value": "Finance",
    //         "label": "Finance"
    //     },
    //     {
    //         "value": "Education",
    //         "label": "Education"
    //     },
    //     {
    //         "value": "Food",
    //         "label": "Food"
    //     },
    //     {
    //         "value": "Jobs",
    //         "label": "Jobs"
    //     },
    //     {
    //         "value": "Entertainment",
    //         "label": "Entertainment"
    //     },
    //     {
    //         "value": "Travel",
    //         "label": "Travel"
    //     },
    //     {
    //         "value": "Marketing",
    //         "label": "Marketing"
    //     },
    //     {
    //         "value": "Fitness",
    //         "label": "Fitness"
    //     },
    //     {
    //         "value": "Business",
    //         "label": "Business"
    //     },
    //     {
    //         "value": "Photography",
    //         "label": "Photography"
    //     },
    //     {
    //         "value": "News and Politics",
    //         "label": "News and Politics"
    //     },
    //     {
    //         "value": "Astrology",
    //         "label": "Astrology"
    //     },
    //     {
    //         "value": "Art & Crafts",
    //         "label": "Art & Crafts"
    //     },
    //     {
    //         "value": "Fitness & wellness",
    //         "label": "Fitness & wellness"
    //     },
    //     {
    //         "value": "Lifestyle",
    //         "label": "Lifestyle"
    //     },
    //     {
    //         "value": "Comedy",
    //         "label": "Comedy"
    //     },
    //     {
    //         "value": "Fiction & Fantasy",
    //         "label": "Fiction & Fantasy"
    //     },
    //     {
    //         "value": "History & Culture",
    //         "label": "History & Culture"
    //     },
    //     {
    //         "value": "Theatre",
    //         "label": "Theatre"
    //     },
    //     {
    //         "value": "Environment",
    //         "label": "Environment"
    //     },
    //     {
    //         "value": "Relationships",
    //         "label": "Relationships"
    //     },
    //     {
    //         "value": "Beauty and Makeup",
    //         "label": "Beauty and Makeup"
    //     },
    //     {
    //         "value": "Cartoons",
    //         "label": "Cartoons"
    //     },
    //     {
    //         "value": "Crypto",
    //         "label": "Crypto"
    //     },
    //     {
    //         "value": "Dance",
    //         "label": "Dance"
    //     },
    //     {
    //         "value": "Design",
    //         "label": "Design"
    //     },
    //     {
    //         "value": "Fashion & Lifestyle",
    //         "label": "Fashion & Lifestyle"
    //     },
    //     {
    //         "value": "Gaming",
    //         "label": "Gaming"
    //     },
    //     {
    //         "value": "Health",
    //         "label": "Health"
    //     },
    //     {
    //         "value": "Hobbies",
    //         "label": "Hobbies"
    //     },
    //     {
    //         "value": "Mentorship",
    //         "label": "Mentorship"
    //     },
    //     {
    //         "value": "Motivation",
    //         "label": "Motivation"
    //     },
    //     {
    //         "value": "Music",
    //         "label": "Music"
    //     },
    //     {
    //         "value": "Non-profit",
    //         "label": "Non-profit"
    //     },
    //     {
    //         "value": "Parenting",
    //         "label": "Parenting"
    //     },
    //     {
    //         "value": "Pets & Animals",
    //         "label": "Pets & Animals"
    //     },
    //     {
    //         "value": "Religion",
    //         "label": "Religion"
    //     },
    //     {
    //         "value": "Spirituality",
    //         "label": "Spirituality"
    //     },
    //     {
    //         "value": "Startups",
    //         "label": "Startups"
    //     },
    //     {
    //         "value": "Technology",
    //         "label": "Technology"
    //     }
    // ]
    email: { type: String },
    phoneNumber: { type: String },
    userNames: [{ type: String }],
  },
  { timestamps: true }
);

mongoose.pluralize(null);

export const UserModel = mongoose.model(
  'Users',
  UserSchema
);

const otpIndexes = [{ email: -1, phoneNumber: -1 }];

UserModel.indexes = otpIndexes;
