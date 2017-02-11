## Serialization

```js
app.data = {
    supplySerializer(data) {
        return new JaoSerializer(data);        
    },
    supplyPolisher(data) {
        if (data instanceof mongoose.Model) {
            return new MongooseDataPolisher();
        }
    },
    polish(data) {
        const polisher = this.supplyPolisher(data);
        if (polisher) {
            data = polisher.polish(data);
            return this.polish(data);
        }
        return data;
    },
    serialize(data) {
        const serializer = this.supplySerializer(data);
        if (serializer) {
            return serializer.serialize(thsi.polish(data));
        }
        return data;
    }
};
```
### Serialization cases:

1. Serialization

```js 
ctx.rawBody = data;
```

2. Polishing

```js
// third parameter `true` means should we polish data with predefined polisher or no
ctx.rawBody = polish(data, {
    ignored: ['authKey', 'password']
}, true);
```