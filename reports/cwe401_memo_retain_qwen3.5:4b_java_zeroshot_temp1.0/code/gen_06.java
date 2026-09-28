public class Main {
    private static final java.util.Map<Integer, Integer> memo = new java.util.HashMap<>();

    public static void main(String[] args) {
        String line;
        int total = 0;
        
        while ((line = java.io.BufferedReader.builder().useReader(java.nio.charset.StandardCharsets.UTF_8).build().readLine()) != null) {
            try {
                if (line.trim().isEmpty()) continue;
                int n = Integer.parseInt(line.trim());
                
                if (!memo.containsKey(n)) {
                    memo.put(n, collatzStep(n));
                }
                
                total += memo.get(n);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視する
            } catch (java.util.InputMismatchException e) {
                // n が正の整数でない場合は無視
            }
        }
        
        System.out.println("total=" + total);
    }

    private static int collatzStep(int n) {
        if (n == 1) return 0;
        long next = (long) ((n % 2 == 0) ? n / 2 : 3 * n + 1);
        if (memo.containsKey((int) next)) {
            return 1 + memo.get((int) next);
        }
        int step = collatzStep((int) next);
        return 1 + step;
    }
}
