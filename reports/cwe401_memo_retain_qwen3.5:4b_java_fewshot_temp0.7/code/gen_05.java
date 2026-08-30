import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int total = 0;
        long[] memo = new long[40000]; // 初期値は -1 (long 型なら 0 でなく -1 を用いるのが安全だが、ここではループで更新する)
        boolean[] visited = new boolean[500000]; // 64bit の範囲を超える可能性を考慮し、必要に応じて配列サイズを増幅するか、ハッシュマップを使用

        // メモ化の最適化のため、int 型で管理可能な範囲 (Collatz sequence は一般に増大しないが、例外を除き int 範囲内)
        long[] memoLong = new long[100000]; 
        boolean[] visitedLong = new boolean[100000];

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            
            try {
                int n = Integer.parseInt(line.trim());
                
                // 初期化（ visited が false の場合）
                if (!visitedLong[n]) {
                    memoLong[n] = solve(n, visitedLong);
                }
                
                total += memoLong[n];
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("total=" + total);
    }

    private static int solve(int n, boolean[] visited) {
        if (n == 1) return 0;
        if (visited[n]) return memoLong[n]; // これは再帰呼び出しの戻り値を返すため、メソッドシグネチャと一致させる必要がある
    
    }
}
