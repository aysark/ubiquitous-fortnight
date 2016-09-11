import json
import urllib2


array=[]
for x in range(0,50):
  print x
  response = urllib2.urlopen('https://public-api.wordpress.com/wp/v2/sites/techcrunch.com/posts?offset='+str(x*100)+'&per_page=100').read()
  jsond = json.loads(response)
  for articles in jsond:
    array.append({'id':articles['id'], 'title':articles['title'], 'content':articles['content']})
with open('aaa.txt', 'w') as outfile:
    json.dump({'data': array}, outfile)
