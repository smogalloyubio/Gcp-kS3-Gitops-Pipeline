import sys, os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
import pytest
from app import app

def test_index_page_returns_200():
    client = app.test_client()
    response = client.get('/')
    assert response.status_code == 200
    assert b"Crypto" in response.data or b"crypt" in response.data.lower()

@pytest.mark.parametrize('endpoint', [
    '/api/crypto',
    '/api/stats',
    '/health',
])
def test_api_endpoints_return_json(endpoint):
    client = app.test_client()
    response = client.get(endpoint)
    assert response.status_code == 200
    assert response.is_json

@pytest.mark.parametrize('coin_id', ['bitcoin', 'ethereum', 'solana', 'bnb', 'cardano'])
def test_crypto_history_returns_data(coin_id):
    client = app.test_client()
    response = client.get(f'/api/crypto/{coin_id}/history')
    assert response.status_code == 200
    assert response.is_json
    data = response.get_json()
    assert isinstance(data, list)
    assert len(data) == 30
    assert 'price' in data[0]
    assert 'date' in data[0]

def test_health_endpoint_contains_status():
    client = app.test_client()
    response = client.get('/health')
    assert response.status_code == 200
    data = response.get_json()
    assert data['status'] == 'healthy'
    assert 'timestamp' in data
