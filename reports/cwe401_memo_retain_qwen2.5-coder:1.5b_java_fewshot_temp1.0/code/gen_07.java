import java.util.HashMap;
import java.util.Map;

class Main {
    private static final int MAX = 65536;
    private static final int[][] memo = new int[MAX][2];

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int total = 0;
        Map<Integer, Integer> memoized = new HashMap<>();
        if (line != null) {
            for (String n : line.split("\\s+")) {
                if (!n.trim().isEmpty()) {
                    int x = Integer.parseInt(n);
                    if (memoized.containsKey(x)) {
                        total += memoized.get(x);
                    } else {
                        int result = calculateSteps(x, memoized);
                        total += result;
                        memoized.put(x, result);
                    }
                }
            }
        }
        System.out.println("total=" + total);
    }

    private static int calculateSteps(int x, Map<Integer, Integer> memoized) {
        if (x == 1) return 0;
        if (x < MAX && memo[x][0] != 0) return memo[x][0];
        int steps;
        if (x % 2 == 0) {
            steps = 1 + calculateSteps(x / 2, memoized);
        } else {
            steps = 1 + calculateSteps(3 * x + 1, memoized);
        }
        if (x < MAX) memo[x] = new int[]{steps, 1};
        return steps;
    }
}
