from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship, backref
from database import Base
from datetime import datetime, date

class Node(Base):
    __tablename__ = 'node'
    id = Column(Integer, primary_key=True)
    pid = Column(Integer, ForeignKey('node.id'))
    name = Column(String(50))
    title = Column(String(150))
    segment = Column(String(50))
    children = relationship('Node', backref=backref('parent', remote_side=id))

    def __init__(self, name):
        self.name = name

    @property
    def serializable(self):
        d = {}
        for col in self.__table__.columns.keys():
            d[col] = getattr(self, col)
            if isinstance(d[col], date):
                d[col] = str( d[col] )
        return d
