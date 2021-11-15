---
layout: post
title: "You're Toxic: Using the Toxicity Model with TensorFlow.js"
date: 2021-11-15
tags: [TFJS]
author: Bekah
---

One of the things I've really enjoyed about learning TensorFlow.js (TFJS) is how quickly you can get it up and running and how many existing projects you can use as well. As someone learning about models and datasets and things like neural networks that haven't been a normal part of my vocabulary, I appreciate not having to be mentally exhausted with the costs of learning a new world of information as I explore this new technology.

As Gant Laborde says in [_Learning Tensorflow.js_](https://www.oreilly.com/library/view/learning-tensorflowjs/9781492090786/)

> Solving simple problems you understand with machine learning helps you extrapolate the steps, logic, and trade-offs of solving advanced problems you could never code by hand.

He goes on to say that (in the book), he tries to balance theory and practicality. Below, we'll dive into a little bit of both, trying to understand the [Toxicity model](https://github.com/tensorflow/tfjs-models/tree/master/toxicity) and what's happening as we get some code up on the screen. (Side note: if you're interested in exploring other TFJS models, you can check out the official [TFJS model list](https://github.com/tensorflow/tfjs-models/).)

## Key Terms

- Model: An expression of an algorithm that's been trained with data to recognize patterns and can make predictions, transformations, or react.
- Threshold: The minimum prediction confidence that we'll allow.
- Labels: An array of categories--in our case, insults.
- Predictions: An array of objects that shows the raw probabilities for each input with `match` indicating true or false. However, if neither prediction exceeds the threshold, `match` will return `null`.

Now who's ready to see if you're toxic?

## The Toxicity Classifier

The toxicity model determines if text falls into the following categories:
threatening language, insults, obscenities, identity-based hate, or sexually explicit language. You can check out the [dataset the model was trained on](https://figshare.com/articles/data_json/7376747) if you're interested.

So for our purposes, we're going to give the model a sentence in the form of a string, and it will classify whether or not it violates one of the categories above.

We'll see that the predictions will use percentage-of-probability prediction for each string in the array. These percentages are represented as two Float32 values between 0 and 1. So, for example, my 5yo called my 7yo "a tiny, little baby poop" one day. If we run that string through the model and get an array that says something like [0.7630404233932495, 0.2369595468044281], it's 76% not a violation and 24% likely a violation.

### Getting Started

In your terminal, cd into the folder you use for your projects. Create a new directory for this project and then hit enter:

`mkdir toxicity-classifier`

cd into that directory:

`cd toxicity-classifier`

Now, you can open this up in the code editor of your choice and install the model we're using:

`$ yarn add @tensorflow/tfjs @tensorflow-models/toxicity`

For this example, we're going to keep it simple and use the script tag to load the model.

In your project, create a file called `index.html`. In that file, we'll use script tags to get our model up and running quickly.

![toxicity model html code](../assets/toxicityhtml.svg)

You'll notice that the only thing we'll see is the message to check the console. We'll be console logging the predictions, though we could add more functionality to display the labels and probabilities on the screen.

Next, you're going to create a `src` folder, and within that folder, add `index.js`. This is where the magic will happen.

First, we want to set the threshold. If we don't set it, the default is 0.85. For this exercise, let's say that anything 0.5 and above is positive.

`const threshold = 0.5`

Now, we need to load the model, give it data, and then console.log the predictions.

```
 toxicity.load(threshold).then((model) => {
   const sentences = ["You are a tiny, little baby poop", "My favorite color is blue.", "Shut up!"];

   model.classify(sentences).then((predictions) => {
     console.log(JSON.stringify(predictions, null, 2));
   });
 });
```

---

**VSCode Tip: JSON.stringify**

> Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
>
> Converts a JavaScript value to a JavaScript Object Notation (JSON) string.

---

So if we look at the results for our first string, we'd see this for the first two labels:

```
{
    "label": "identity_attack",
    "results": [
      {
        "probabilities": {
          "0": 0.9983431100845337,
          "1": 0.001656862674281001
        },
        "match": false
      }
    ]
  },
  {
    "label": "insult",
    "results": [
      {
        "probabilities": {
          "0": 0.059056248515844345,
          "1": 0.9409437775611877
        },
        "match": true
      }
    ]
  }
```

What we see here tells us that "You are a tiny, little baby poop" is not classified as an identity attack, but it is 94% sure that it is, in fact, an insult.

Let's go back a little bit to our `index.js` file. We're calling toxicity.load(), but where is the model coming from? That request is going to [TFHub](https://tfhub.dev/), a model hosting service set up by Google for popular community models.

Although you can only load from TFHub, it is open source, which means we can fork and modify the model!

Next up in our code, we run the classify method. This is where the input is passed through the model and we get the results. We give the model data, which is converted to tensors and then reconverted into normal JS primitives. Whoa. That sounds like a lot, and that's something I hope to explore in a post down the line. But it's worth noting here to start peeling back the layers of magic we get to dive into while playing with TFJS.

And if you want to explore some more, here are some resources to check out:

- [TF developer Summit](youtu.be/YB-kfeNIPCE), where they trained a model to control a Pac-man game
- [Directions for installing tfjs](https://www.tensorflow.org/js/tutorials/setup)
- [Documentation](https://github.com/tensorflow/tfjs/tree/master/tfjs)
