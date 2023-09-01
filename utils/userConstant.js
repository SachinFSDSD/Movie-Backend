exports.userObject = (user) => {
  let userResult = [];
  user.forEach((element) => {
    userResult.push({
      _id: element._id,
      name: element.name,
      userId: element.userId,
      email: element.email,
      userType: element.userType,
      userStatus: element.userStatus,
    });
  });
  return userResult;
};
