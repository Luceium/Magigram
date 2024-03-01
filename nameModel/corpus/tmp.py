# remove duplicate entries in tmp.txt
line = []
with open('tmp.txt', 'r') as f:
    lines = f.readlines()
    lines = list(set(lines))

with open('tmp.txt', 'w') as f:
    for line in lines:
        f.write(line)