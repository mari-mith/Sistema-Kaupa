from rest_framework import viewsets
from .models import Produto
from .serializers import ProdutoSerializer

class ProdutoViewSet(viewsets.ModelViewSet):
    queryset = produtos = Produto.objects.all().order_by('-id')
    serializer_class = ProdutoSerializer
