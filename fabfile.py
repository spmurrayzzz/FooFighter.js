# Fabfile for FooFighter.js

from fabric.api import (sudo,
                        local,
                        cd,
                        run,
                        put,
                        env,)
import json

try:
    with open('fabConfig.json', 'r') as f:
        config = json.load(f)
except:
    print 'Error loading fabConfig.json file. Aborting...'
    exit(1)

env.roledefs = {}

for role in config['roles']:
    host = config['roles'][role]
    if type(env.roledefs.get(role, None)) is not dict:
        env.roledefs[role] = []
    env.roledefs[role].append(host)

env.user = config.get('user', None)


def release():
    target_path = config.get('target_path', None)

    if not target_path:
        print 'Missing `target_path` in config. Aborting...'
        exit(1)

    with cd(target_path):
        run('git clean -f')
        run('git reset --hard')
        run('git pull --rebase')
        run('touch .production')
        run('npm install')
