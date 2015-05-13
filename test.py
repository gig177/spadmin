from database import dbsess
from models import *
from sqlalchemy.orm import aliased
import sqltap
import logging
logging.basicConfig(filename='log')
logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)
"""
clause.compile(dialect=conn.engine.dialect, compile_kwargs={'literal_binds': True})
"""

#root = dbsess.query(Node).filter_by(pid = None).one()
#subchild_1 = dbsess.query(Node).filter_by(id = 4).one()

"""
class SessionWithCompiledSQL(sqltap.ProfilingSession):
    def _after_exec(self, conn, clause, multiparams, params, results):
        duration = time.time() - conn._sqltap_query_start_time
        context = (None if not self.user_context_fn else
                   self.user_context_fn(conn, clause, multiparams, params, results))
        try:
            text = clause.compile(dialect=conn.engine.dialect, compile_kwargs={'literal_binds': True})
        except AttributeError:
            text = clause
        self.collect_fn(QueryStats(text, traceback.extract_stack()[:-1], duration, context))

profiler = SessionWithCompiledSQL()
with profiler:
    nodealias = aliased(Node)
    dbsess.query(Node).filter(Node.name == 'subchild_1').\
        join(nodealias, Node.parent).\
        filter(nodealias.name == 'child_2').\
        all()

    dbsess.query(Node).filter(Node.name == 'subchild_1').\
        join(Node.parent, aliased=True).\
        filter(Node.name == 'child_2').\
        all()

    dbsess.query(Node).filter(Node.name == 'subchild_1').\
        join(Node.parent, aliased=True).\
        filter(Node.name == 'child_2').\
        join(Node.parent, aliased=True, from_joinpoint=True).\
        filter(Node.name == 'root').\
        all()

stats = profiler.collect()
sqltap.report(stats, 'report.html')
"""

