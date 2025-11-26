---
title: "Web Scraping 101: Python & BeautifulSoup"
date: "2024-10-05"
topic: "code"
type: "tutorial"
excerpt: "Learn the basics of web scraping with Python and BeautifulSoup"
tags:
  - python
  - web-scraping
  - tutorial
---

# Web Scraping 101: Python & BeautifulSoup

Web scraping can seem intimidating, but it's actually quite straightforward with Python and BeautifulSoup.

## What You'll Need

```bash
pip install requests beautifulsoup4
```

## Basic Example

```python
import requests
from bs4 import BeautifulSoup

# Fetch the page
url = "https://example.com"
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')

# Find elements
titles = soup.find_all('h2', class_='post-title')

for title in titles:
    print(title.text)
```

## Finding Elements

BeautifulSoup offers several ways to find elements:

- `find()` - returns first match
- `find_all()` - returns all matches
- `select()` - uses CSS selectors

## Best Practices

1. **Check robots.txt** - Respect the site's scraping rules
2. **Add delays** - Don't hammer servers with requests
3. **Handle errors** - Sites change, code should be resilient
4. **Cache results** - Don't re-scrape unnecessarily

## Common Pitfalls

- JavaScript-rendered content (use Selenium instead)
- Rate limiting
- Changing HTML structure

**Remember:** Always scrape responsibly and ethically!
