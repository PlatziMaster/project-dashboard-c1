```sql
CREATE PRIMARY INDEX ON `platzi_store` USING GSI
CREATE INDEX `type` ON `platzi_store`(`type`)
```

```sql
SELECT doc.*
FROM platzi_store AS doc
WHERE doc.type = "conversation"
```

## Count conversations by Date

```js
function (doc, meta) {
  if(
    doc.type === 'conversation' &&
    doc.created_at
  ){
    var datetime = doc.created_at.split('T');
    var date = datetime[0].split('-')
    .map(function(i) {return parseInt(i, 10)})
    emit([date[0], date[1], date[2]]);
  }
}
```

## Group rates
group_by_rate

```js
function (doc, meta) {
  if(
    doc.type === 'conversation' &&
    doc.created_at &&
    doc.rate
  ){
    var datetime = doc.created_at.split('T');
    var date = datetime[0].split('-')
    .map(function(i) {return parseInt(i, 10)})
    emit([date[0], date[1], date[2]], doc.rate);
  }
}
```

### Custom reduce

```js
function (keys, values, rereduce) {
  if (rereduce) {
    var result = {}
    values.forEach(function (count) {
      for (var key in count) {
        if (result[key]){
          result[key] = result[key] +
          count[key]
        } else {
          result[key] = count[key]
        }
      }
    });
    return result;
  } else {
    var count = {};
    values.forEach(function (value) {
      if (count[value]){
        count[value] = count[value] + 1;
      } else {
        count[value] = 1;
      }
    })
    return count;
  }
}
```