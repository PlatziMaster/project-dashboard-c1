const rta = db.createUser({
  user: 'admin',
  pwd: 'admin.1234',
  roles: [
    {
      role: 'readWrite',
      db: 'platzi-store'
    }
  ]
});

console.log('----------------');
console.log(rta);