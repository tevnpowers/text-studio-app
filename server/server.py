# Python code
import gevent
import signal
import zerorpc

from api import TextStudioAPI
print('HELLO WORLD!')

if __name__ == '__main__':
    port = 4242
    addr = 'tcp://127.0.0.1:' + str(port)
    s = zerorpc.Server(TextStudioAPI())
    s.bind(addr)

    gevent.signal(signal.SIGTERM, s.stop)
    gevent.signal(signal.SIGINT, s.stop)  # ^C

    print('Text Studio running on {}'.format(addr))
    s.run()
