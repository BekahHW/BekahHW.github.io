---
layout: post
title: "Hello, Tensor!"
date: 2021-11-22
tags: [TFJS]
author: Bekah
---

So we've been using the word tensor, just throwing it around, but now we're going to learn a little more about it. You don't _have_ to understand everything. This isn’t an in depth exploration of what tensors are or a debate about whether the mathematical definition of tensors versus the computer science definition of tensors. Understanding enough to know _how_ you can use tensors should be the goal here, so a basic understanding can allow us to do a better job of using tensors in our development.

## What are tensors?

Tensors are collections of data in a structured type that are optimized as numbers to be ready for calculations. They’re similar to working with multidimensional arrays in JavaScript.

We use tensors because they can do calculations quickly; they’re created to do many side by side calculations at once and can batch process at high speeds. They also provide us with direct access to data in a useable format. Outside of Machine Learning, there are libraries that use tensors for images, sound, 3d models, etc.

Tensors have a rank, shape, and datatype (dtype). According to [TensorFlow.js Tensors and operations](https://www.tensorflow.org/js/guide/tensors_operations), these can be defined as:

> rank: defines how many dimensions the tensor contains
>
> shape: which defines the size of each dimension of the data
>
> dtype: which defines the data type of the tensor.

You can check what each tensor is by calling the tensor method. If you want to follow along and experiment with tensors, you can fork and use my [Hello Tensor Sandbox](https://codesandbox.io/s/hello-tensor-tfjs-sandbox-dodb3). Inside the sandbox, the only changes you’ll need to make are in `src > index.js`. Most of your changes will be to line 5, subbing in the data you’re experimenting with.

EXAMPLE

```
Import * as tf from "@tensorflow/tfjs";

 const tensorExample =  [1, 2, 3]
	console.log(tf.tensor(tensorExample))
```

When we check the console, we’ll see a lot of information there. For the purpose of this blog, we’ll go through the three properties defined above.

```
rankType: “1”
Shape: Array(1) > 0:3
dataType: “float32”
```

So what does that mean?

### RankType

We know that the rank has one dimension. But what is a dimension? Each array has a dimension. Because we only have a single array, it’s a rank 1, a flat dataset. We need only a single index to access the data.

If we have a rankType of “2”, that means that we have an array of arrays, and we need two indexes to access this data. In other words, we have an x and y coordinate here, and also called a rank-2.

```
const twoDimensionArray = [ [2,3], [5,6], [7,8] ]
console.log(twoDimensionArray([0,0])
```

What do you think the answer is here?

If you guessed [2,3], you’d be correct! Our first indexed array is the outer array. The second, or y-coordinate, refers to the inner arrays. In this case, it’s the [2,3] array.

So if we wanted to get [7,8], we would do that by twoDimensionArray([0,2]).

### Shape

We have a single array like in the original example ( const tensorExample = [1, 2, 3]), and if we check the array at the 0 index, we see that there are three items in the array.

Now, let’s look at a new example:

```
const = newArray
[
    [
     [2, 3, 9, 0],
     [5, 6, 9, 8]
    ],
    [
      [7, 8, 4, 3],
      [1, 2, 4, 9]
    ],
    [
      [7, 8, 2,1],
      [1, 2, 0,7]
    ]
  ];
```

Here we’d have a `shape: Array(3)`. And if we expand that, we see:

```
0 : 3
1 : 2
2 : 4
```

So the first index [0] in the array, is the outer array, which contains three arrays.

So the second index [1] in the array, is the middle set of arrays. Within that set, they contain two sets of arrays, hence the 2. So if we console.log(newArray[0,0]), we get [ 2, 3, 9, 0] and [5, 6, 9, 8].

And the last index [2] in the array, is the most inner and that’s the four numbers we see in the inner arrays. And that’s where we get [5, 6, 9, 8].

If we need to change the shape of a tensor, we can use the `reshape` method.

### DataType

DataType, or as it’s printed in the console `dType` , is a “float32.” This is the default dataType for tensors. If we need to create our tensor in a different form, we can also use bool, int32, complex64, and string.

Depending on your goals, you might need to use a different form, and there’s a way to specify the type that you need.

This might seem like a lot, but remember these are the basics for understanding so you can use tensors to do some really magical things. And if you’ve walked through these examples and tried them out for yourself, you’ve created your very first tensor. Hello, Tensor!

### Resources

-[TensorFlowjs Guide](https://www.tensorflow.org/js/guide/tensors_operations) -[Learn TensorFlow.js](https://infinite.red/learn-tensorflowjs)
