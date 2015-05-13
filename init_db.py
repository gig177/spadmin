#!/bin/env python
from database import init_db, dbsess
from models import *
init_db()
"""
1        NULL          root
2        1             child_1
3        1             child_2
4        3             subchild_1
5        3             subchild_2
6        1             child_3
Node('root').children.append(
    Node('child_1'),
    Node('child_2').children.append(
        Node('subchild_1'),
        Node('subchild_2'),
    ),
    Node('child_3'))

root = Node('root')
Node('child_1').parent = root
Node('child_2').parent = root
Node('subchild_1').parent = root.children[1]
Node('subchild_2').parent = root.children[1]

dbsess.add(root)
dbsess.commit()
"""
