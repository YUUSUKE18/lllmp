public class Main {
    public static void main(String[] args) {
        long target = Long.parseLong(args[0]);
        List<long> values = new ArrayList<>();
        for (int i = 1; i < args.length; i++) {
            values.add(Long.parseLong(args[i]));
        }
        
        int pairCount = 0;
        for (int i = 0; i < values.size(); i++) {
            for (int j = i + 1; j < values.size(); j++) {
                if (values.get(i) + values.get(j) == target) {
                    pairCount++;
                }
            }
        }
        
        System.out.println("pairs=" + pairCount);
    }
}
