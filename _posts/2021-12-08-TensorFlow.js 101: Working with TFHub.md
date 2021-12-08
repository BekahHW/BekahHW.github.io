---
layout: post
title: "TensorFlow.js 101: Working with Models and TFHub"
date: 2021-12-08
---

Models allow us to take data and make predictions, reactions, transformations, etc. There are models that work with images, audio, and other forms of data. We can do things like identify objects in images, create text from audio, and analyze the form of athletes doing things like swinging a baseball bat, doing a deadlift, or throwing a ball.

Creating your own model might sound really overwhelming and impossible if you’re just learning TFJS. And that’s ok! You don’t have to create your own models. You can work with a pre-trained model and run it as is, or you can train it for your specific uses--also known as **[transfer learning](https://builtin.com/data-science/transfer-learning)**. Today, we’re going to be talking about using pretrained models and how you can do that.

### Words to Know

**Model**: an expression of an algorithm that’s been trained with data to recognize patterns and can make predictions, transformations, or react.
**[TFHub](https://tfhub.dev/)**: TensorFlow Hub is a Google site that hosts popular community models that anyone can use.
**Image Classification**: when a trained model identifies images and labels them.

When you’re getting started with TFJS models, you need to decide what kind of model you need and where you can access that model. We’re not going to go in depth into the difference between Layers models and Graph models, because we’re going to focus on how to use models and then come back to that in a future blog post once we get a better sense of how we’re using models. But it’s worth mentioning here in case you’re ready to jump in and do some research on your own. If you’re looking at examples, you might notice that some models are loaded using the [loadLayersModel method](https://js.tensorflow.org/api/latest/#loadLayersModel) for Layers models or [the loadGraphModel method](https://js.tensorflow.org/api/latest/#loadGraphModel) for Graph Models.

## Using a Model from TFHub

When we got to [TFHub](https://tfhub.dev/) we see there are a number of options to choose from. Since I’m learning TensorFlow.js, I like to start by browsing the `Model format` category for `TF.js`.

From there, you can narrow it down further by looking at the TF Version, whether or not it’s Fine Tunable, Architecture, Publisher, Dataset, or language. We’re going to take a look at `Architecture` > `Inception V3`.

That leaves us [with three options](https://tfhub.dev/s?deployment-format=tfjs&network-architecture=inception-v3). Well, since one of our terms for today was image classification, I bet you can guess that `[Image Classification](https://tfhub.dev/google/imagenet/inception_v3/classification/5)` is our selection.

We need to identify what’s most important here. We need to know the size of the image that’s expected, the image values, ranging from 0 to 1. And finally, we’re looking for the values that are returned. This image classifier is going to identify how likely an image is related to the labels. Let's take a look at the [labels](download.tensorflow.org/data/ImageNetLabels.txt) they give us.

It’s important to note that we’re going to give the labels their own file in our example, and export them as “INCEPTION_CLASSES”

These are the names for the images the model is trained to identify and will return numbers that relate to certaintly for each of the labels. For example, if we show the model a picture of a kitten, and that returns .9800 for the cat label, then it is 98% sure that the kitten is a cat.

(If you really want cuteness, check out the [axolotl](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH34JAxPLqDvnWvnDmc5qubBHzmjMvkiWQ2bJJl2V_yEMIQIAjno5Ltq9tfjqVgIS3uFc&usqp=CAU). That’s my fav on the list.)

Now the [page for v3](https://tfhub.dev/google/tfjs-model/imagenet/inception_v3/classification/3/default/1) of this model tells us that we need to load the model like this:

`tf.loadGraphModel("https://tfhub.dev/google/tfjs-model/imagenet/inception_v3/classification/3/default/1", { fromTFHub: true })`

But once we load that model, then what? Let’s dig into how to use the model.

Well, the model classifies, right? That means that we need to give it something to classify.

So there are two things we need to do here.

Get the image
Put the image in a usable form.

So let’s imagine that we have an image in our `index.html` file that looks like this:

```
<img
        id="inceptionImg"
        src="https://source.unsplash.com/YeOMRwgvPv4"
        crossorigin="anonymous"
        style="width: 50%;"
      />
```

So let’s grab that using jQuery:

`const lobsterImg = document.getElementById("inceptionImg");`

Now that we have the image, we need to convert it to a usable form. This means we need to convert it from pixels into tensors, and then we need to make it the correct shape.

In this case, [the docs](https://tfhub.dev/google/imagenet/inception_v3/classification/5) give us the size we need:

> The expected size of the input images is height x width = 299 x 299 pixels by default, but other input sizes are possible (within limits).

**[Pixels to Tensors](https://js.tensorflow.org/api/latest/#browser.fromPixels)**
`const tensorLobster= tf.browser.fromPixels(lobsterImg);`

**[Resize Image](https://js.tensorflow.org/api/latest/#image.resizeBilinear)**

This is going to be a three-step process. We need to resize and reshape:

`const formattedImg = tf.image.resizeBilinear(tensorLobster, [299, 299], true).div(255).reshape([1, 299, 299, 3])`

That gives us a form that we can work with to find the results.

```
const results = model.predict(formattedImg)
result.print( )
```

What do we see in the console? We need to do a little bit more work to get this into a form we can use. So we’re going to look at the [topk method](https://js.tensorflow.org/api/latest/#div). What we see from the docs is that this method:

> Finds the values and indices of the k largest entries along the last dimension.

We’re going to pass it our results and limit it to the top 3 values. For that, we want to use indices.

`const { values, indices } = tf.topk(results, 3)`

Now we can access the top three labels that this model has used to classify our image. Remember those INCEPTION_CLASSES we referred to earlier in the post? We need to use those now like this if we're console.logging it:

```
"first place:", INCEPTION_CLASSES[winners[0]],
"second place:", INCEPTION_CLASSES[winners[1]],
"Third place:", INCEPTION_CLASSES[winners[2]]
```

You can console.log this, or you can check out the [codesandbox](https://codesandbox.io/s/inception-tfjs-sandbox-rcor8?file=/src/index.js:1150-1320) I made, and click the run button to see the top three labels render to the screen.

And that’s it! That’s how we can use this model. If you’re learning along with me, please feel free to ask questions, check out my [twitch stream](https://www.twitch.tv/bekahhw/) where I talk through all these concepts, sign-up for our [study group](https://lu.ma/z1vbo6jc), and remember that we’re jumping past some of the basics to have some fun, but we’re making up for that along the way. It might not be a traditional path, but it’s one that works for me and, hopefully, for you.
