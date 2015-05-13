from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship, backref
from database import Base

class Node(Base):
    __tablename__ = 'node'
    id = Column(Integer, primary_key=True)
    pid = Column(Integer, ForeignKey('node.id'))
    name = Column(String(50))
    children = relationship('Node', backref=backref('parent', remote_side=id))

    def __init__(self, name):
        self.name = name
