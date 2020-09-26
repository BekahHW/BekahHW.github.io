---
layout: default
permalink: /blog.html
---

{% assign posts = site.posts | where:"type", "blog" %}

<ul>
{% for post in posts %}
<li>
<a href="{{ site.url }}{{site.baseurl}}{{ post.url }}">{{ post.title }}</a>
</li>
{% endfor %}
<ul>
